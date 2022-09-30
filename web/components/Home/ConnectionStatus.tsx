import { useMqttState } from 'mqtt-react-hooks';

export function ConnectionStatus() {
  const { connectionStatus } = useMqttState();

  return (
    <>
      {connectionStatus === 'Connected' ? (
        <div className="h-5 w-5 rounded-full bg-green-600 "></div>
      ) : (
        <div className="h-5 w-5 rounded-full bg-slate-400 border-4 border-slate-300"></div>
      )}
    </>
  );
}
