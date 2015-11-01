using System;
using ALS.Glance.Models.Core.Interfaces;

namespace ALS.Glance.Models.Core
{
    /// <summary>
    /// The model class with an associated unique identifier and updated metadata information
    /// </summary>
    /// <typeparam name="TId">The unique model identifier type</typeparam>
    public abstract class ModelWithUpdatedMeta<TId> : Model<TId>, IHaveUpdatedMeta
    {
        public virtual DateTimeOffset? UpdatedOn { get; set; }

    }

    /// <summary>
    /// The model class with updated metadata information
    /// </summary>
    public abstract class ModelWithUpdatedMeta : Model, IHaveUpdatedMeta
    {
        public virtual DateTimeOffset? UpdatedOn { get; set; }

    }
}