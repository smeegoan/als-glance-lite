namespace ALS.Glance.Models.Core.Interfaces
{
    /// <summary>
    /// The model interface with an associated unique identifier
    /// </summary>
    /// <typeparam name="TId">The unique model identifier type</typeparam>
    public interface IModel<TId> : IModel
    {
        /// <summary>
        /// The unique model identifier
        /// </summary>
        TId Keycol { get; set; }
    }

    /// <summary>
    /// The model interface
    /// </summary>
    public interface IModel
    {

    }
}