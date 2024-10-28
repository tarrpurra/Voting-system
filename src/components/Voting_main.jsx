import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Voting() {
    const navigate = useNavigate();
    const [time, setTime] = useState(30);
    const [hasVoted, setHasVoted] = useState(false);
    const [selectedParty, setSelectedParty] = useState(null); 

    useEffect(() => {
        if (time === 0) {
            navigate("/Login");
            return;
        }
        
        if (hasVoted) return; // Stop timer if user has voted

        const intervalId = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(intervalId); 
    }, [time, navigate, hasVoted]);

    function voted(party) {
        setHasVoted(true);
        setSelectedParty(party); 
    }

    return (
      <div className="flex flex-col items-center justify-center h-screen bg-custom-gradient p-4 relative">
        
        {/* Time Display */}
        <div className="absolute top-4 left-4 bg-slate-100 p-2 rounded-md shadow-md">
          <h1 className="text-lg">Time: {time} Sec</h1>
        </div>
        
        {/* Voting Table */}
        <table className="w-full h-full max-w-4xl border border-gray-300 bg-white shadow-md rounded-2xl mt-12">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-center">
              <th className="p-3 border-b border-gray-300">Party Name</th>
              <th className="p-3 border-b border-gray-300">Symbol</th>
              <th className="p-3 border-b border-gray-300">Vote</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="p-3 border-b border-gray-200">Party A</td>
              <td className="p-3 border-b border-gray-200 bg-partyA bg-contain bg-no-repeat bg-center"></td>
              <td className="p-3 border-b border-gray-200">
                <button
                  type="button"
                  className="bg-red-600 text-white p-4 rounded-md hover:bg-red-700 transition ease-in-out duration-150"
                  onClick={() => voted({ name: "Party A", logoClass: "bg-partyA" })}
                  disabled={hasVoted}
                >
                  VOTE
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="p-3 border-b border-gray-200">Party B</td>
              <td className="p-3 border-b border-gray-200 bg-partyB bg-contain bg-no-repeat bg-center"></td>
              <td className="p-3 border-b border-gray-200">
                <button
                  type="button"
                  className="bg-red-600 text-white p-4 rounded-md hover:bg-red-700 transition ease-in-out duration-150"
                  onClick={() => voted({ name: "Party B", logoClass: "bg-partyB" })}
                  disabled={hasVoted}
                >
                  VOTE
                </button>
              </td>
            </tr>
            <tr className="text-center">
              <td className="p-3 border-b border-gray-200">Party C</td>
              <td className="p-3 border-b border-gray-200 bg-partyC bg-contain bg-no-repeat bg-center"></td>
              <td className="p-3 border-b border-gray-200">
                <button
                  type="button"
                  className="bg-red-600 text-white p-4 rounded-md hover:bg-red-700 transition ease-in-out duration-150"
                  onClick={() => voted({ name: "Party C", logoClass: "bg-partyC" })}
                  disabled={hasVoted}
                >
                  VOTE
                </button>
              </td>
            </tr>

          </tbody>
        </table>

        {/* Thank You Message */}
        {hasVoted && selectedParty && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Thank you for voting!</h2>
            <div className={`w-16 h-16 ${selectedParty.logoClass} bg-contain bg-no-repeat bg-center mb-2`}></div>
            <p className="text-gray-600">You voted for {selectedParty.name}</p>
            <button 
              onClick={() => navigate("/Login")} 
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Return to Login
            </button>
          </div>
        )}
      </div>
    );
}
