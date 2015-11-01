using System;
using System.Net.Http;
using System.Web;
using System.Web.Caching;

namespace ALS.Glance.Core.Cache
{
    public class ResponseCache<T> : BaseCache
    {
        private readonly bool _absoluteExpiration;
        private readonly bool _enabled;
        private readonly int _shortTimeInMinutes;
        private readonly int _longTimeInMinutes;
        private readonly TimeSpan _expireSpan;

        public ResponseCache()
        {
        }

        public ResponseCache(bool absoluteExpiration, DefaultCacheTime defaultCacheTime, bool enabled, int shortTimeInMinutes, int longTimeInMinutes)
        {
            _absoluteExpiration = absoluteExpiration;
            _enabled = enabled;
            _shortTimeInMinutes = shortTimeInMinutes;
            _longTimeInMinutes = longTimeInMinutes;
            _expireSpan = GetDefaultTimeSpan(defaultCacheTime);
        }

        public ResponseCache(bool absoluteExpiration, int minutes)
        {
            _absoluteExpiration = absoluteExpiration;
            _expireSpan = new TimeSpan(0, minutes, 0);
        }



        public T GetValue(HttpRequestBase requestMessage)
        {
            if (!_enabled)
            {
                return default(T);
            }

            var key = HttpUtility.UrlDecode(requestMessage.RawUrl);
            return key == null ? default(T) : (T)Cache.Get(key);
        }

        public T GetValue(HttpRequestMessage requestMessage)
        {
            if (!_enabled)
            {
                return default(T);
            }

            var key = HttpUtility.UrlDecode(requestMessage.RequestUri.AbsoluteUri);
            return key == null ? default(T) : (T)Cache.Get(key);
        }

        private void SetValue(string key, object value)
        {
            if (_enabled && value != null && key != null)
            {
                Cache.Add(
                  key,
                  value,
                  null,
                  _absoluteExpiration ? DateTime.Now.Add(_expireSpan) : System.Web.Caching.Cache.NoAbsoluteExpiration,
                  _absoluteExpiration ? System.Web.Caching.Cache.NoSlidingExpiration : _expireSpan,
                  CacheItemPriority.Default, null);
            }
        }

        public void SetValue(HttpRequestBase requestMessage, object value)
        {
            SetValue(HttpUtility.UrlDecode(requestMessage.RawUrl), value);
        }

        public void SetValue(HttpRequestMessage requestMessage, object value)
        {
            SetValue(HttpUtility.UrlDecode(requestMessage.RequestUri.AbsoluteUri), value);
        }

        public void Remove(string key)
        {
            if (_enabled)
            {
                Cache.Remove(key);
            }
        }

        private TimeSpan GetDefaultTimeSpan(DefaultCacheTime defaultCacheTime)
        {
            switch (defaultCacheTime)
            {
                case DefaultCacheTime.Short:
                    return new TimeSpan(0, _shortTimeInMinutes, 0);
                case DefaultCacheTime.Long:
                    return new TimeSpan(0, _longTimeInMinutes, 0);
                default:
                    return new TimeSpan(0, _shortTimeInMinutes, 0);
            }
        }
    }
}