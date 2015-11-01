using System;
using ALS.Glance.Models.Core.Interfaces;

namespace ALS.Glance.Models.Core
{
    /// <summary>
    /// The model class with an associated unique identifier, created and updated metadata information
    /// </summary>
    /// <typeparam name="TId">The unique model identifier type</typeparam>
    public abstract class ModelWithAllMeta<TId> : Model<TId>, IHaveCreatedMeta, IHaveUpdatedMeta
    {
        public virtual DateTimeOffset? CreatedOn { get; set; }

        public virtual DateTimeOffset? UpdatedOn { get; set; }

    }

    /// <summary>
    /// The model class with created and updated metadata information
    /// </summary>
    public abstract class ModelWithAllMeta : Model, IHaveCreatedMeta, IHaveUpdatedMeta
    {
        public virtual DateTimeOffset? CreatedOn { get; set; }

        public virtual DateTimeOffset? UpdatedOn { get; set; }

    }
}