namespace ALS.Glance.Models.Core.Interfaces
{
    /// <summary>
    /// The model interface contains a version number
    /// </summary>
    public interface IHaveVersion<TVersion>
    {
        /// <summary>
        /// The model version number
        /// </summary>
        TVersion Version { get; set; }
    }
}