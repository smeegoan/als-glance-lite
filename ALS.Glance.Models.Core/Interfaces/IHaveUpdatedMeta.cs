using System;

namespace ALS.Glance.Models.Core.Interfaces
{
    /// <summary>
    /// Model interface containing metadata about the last update
    /// </summary>
    public interface IHaveUpdatedMeta
    {
        /// <summary>
        /// The <see cref="DateTime"/> when the model was last updated
        /// </summary>
        DateTimeOffset? UpdatedOn { get; set; }

    }
}
