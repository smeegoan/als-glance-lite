namespace ALS.Glance.DataAgents.Core.Interfaces
{
    public interface IDataAgentFactory
    {
        TDataAgent Get<TDataAgent>() where TDataAgent : IDataAgent;

        void Release(IDataAgent dataAgent);
    }
}
