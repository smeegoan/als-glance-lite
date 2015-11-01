using System;
using ALS.Glance.Models.Core.Interfaces;

namespace ALS.Glance.Models.Core
{
    /// <summary>
    /// The model class with an associated unique identifier and created metadata information
    /// </summary>
    /// <typeparam name="TId">The unique model identifier type</typeparam>
    public abstract class ModelWithCreatedMeta<TId> : Model<TId>, IHaveCreatedMeta
    {
        public virtual DateTimeOffset? CreatedOn { get; set; }

    }

    /// <summary>
    /// The model class with created metadata information
    /// </summary>
    public abstract class ModelWithCreatedMeta : Model, IHaveCreatedMeta
    {
        public virtual DateTimeOffset? CreatedOn { get; set; }

    }
}