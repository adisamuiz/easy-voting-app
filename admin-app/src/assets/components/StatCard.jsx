function StatCard ({ title, value, description, icon }) {
    return(
        <div className="bg-white text-card-foreground items-start gap-6 rounded-2xl space-y-1 hover:shadow-lg transition-all border-2 border-gray-300 p-4">
            <div className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <h2 className="text-sm font-medium">{title}</h2>
                <span>{icon}</span>
            </div>
            <p className="text-2xl font-bold">{value}</p>
            <h3>{description}</h3>
        </div>
    )
}
export default StatCard;