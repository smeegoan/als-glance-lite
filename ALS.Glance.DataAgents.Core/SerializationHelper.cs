using System;
using System.IO;
using System.Xml.Serialization;
using Newtonsoft.Json;

namespace ALS.Glance.DataAgents.Core
{
    public static class SerializationHelper
    {
        public static string XmlSerialize(object instance)
        {
            var xmlSerializer = new XmlSerializer(instance.GetType());

            using (var stringWriter = new StringWriter())
            {
                xmlSerializer.Serialize(stringWriter, instance);
                return stringWriter.ToString();
            }
        }

        public static string XmlSerialize<T>(T instance, Type[] extraTypes = null)
        {
            XmlSerializer xmlSerializer = extraTypes != null
                ? new XmlSerializer(typeof(T), extraTypes)
                : new XmlSerializer(typeof(T));

            using (var stringWriter = new StringWriter())
            {
                xmlSerializer.Serialize(stringWriter, instance);
                return stringWriter.ToString();
            }
        }

        public static T XmlDeserialize<T>(string xml, Type[] extraTypes = null)
        {
            using (var stringReader = new StringReader(xml))
            {
                XmlSerializer xmlSerializer = extraTypes != null
                    ? new XmlSerializer(typeof(T), extraTypes)
                    : new XmlSerializer(typeof(T));
                return (T)xmlSerializer.Deserialize(stringReader);
            }
        }

        public static String JsonSerialize<T>(T instance)
        {
            return JsonConvert.SerializeObject(instance,
                 Formatting.None,
                new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
            //return JsonSerializer.SerializeToString(instance);
        }

        public static String JsonSerialize(object instance)
        {
            return JsonConvert.SerializeObject(instance,
                Formatting.None,
                new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
            //return JsonSerializer.SerializeToString(instance, instance.GetType());
        }

        public static T JsonDeserialize<T>(string json)
        {
            return JsonConvert.DeserializeObject<T>(json);
            //return JsonSerializer.DeserializeFromString<T>(json);
        }
    }
}
