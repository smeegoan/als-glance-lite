using System;

namespace ALS.Glance.Models.Core.Interfaces
{
    /// <summary>
    /// Model interface containing metadata about the creation
    /// </summary>
    public interface IHaveCreatedMeta
    {
        /// <summary>
        /// The <see cref="DateTime"/> when the model was created
        /// </summary>
        DateTimeOffset? CreatedOn { get; set; }

        /// <summary>
        /// The identity of who created the model
        /// </summary>
       // string CreatedBy { get; set; }
    }
}