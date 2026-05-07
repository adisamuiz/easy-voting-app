function ElectionCard({onClick, className, electionTitle, positions, electionStatus, id}) {
    return (
        <div key={id} onClick={onClick} className={className}>
            <div className="flex-1 px-6 [&:last-child]:pb-6 p-6 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">{electionTitle}</h2>
                <p className="text-sm text-gray-600 mb-2">{positions}</p>
                <span className= {`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  electionStatus === "● Live"
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                  }`
                }>{electionStatus}
                </span>
              </div>
              <div>
                <button onClick={onClick} className="h-9 px-4 py-2 has-[>svg]:px-3 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg">Select</button>
              </div>
            </div>
        </div>
    )
}
export default ElectionCard