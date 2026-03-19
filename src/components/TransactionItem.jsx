/* src/components/TransactionItem.jsx */
export const TransactionItem = ({ name, date, amount, type, icon: Icon }) => {
  const isNegative = amount.startsWith('-');
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-2xl mb-3 border border-slate-50 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600">
          <Icon size={20} />
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-sm">{name}</h4>
          <p className="text-xs text-slate-400 font-medium">{date}</p>
        </div>
      </div>
      <div className={`font-bold ${isNegative ? 'text-slate-900' : 'text-emerald-500'}`}>
        {amount}
      </div>
    </div>
  );
};