/* src/components/BalanceCard.jsx */
import { Copy, ArrowUpRight, Plus, Send, ReceiptText } from 'lucide-react';

export const BalanceCard = ({ onAction }) => {
  return (
    <div className="w-full">
      <div className="gradient-card rounded-3xl p-6 text-white mb-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-brand-primary/20 rounded-full blur-3xl"></div>
        
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">Total Balance</p>
            <h2 className="text-4xl font-bold tracking-tight">$24,500.00</h2>
          </div>
          <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md">
            <CreditCard size={20} />
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/5 w-fit px-3 py-1.5 rounded-full border border-white/10">
          <span className="text-xs font-mono text-slate-300">Acc: 0042 •••• 9912</span>
          <Copy size={14} className="text-slate-400" />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { icon: Send, label: 'Send', color: 'bg-indigo-50 text-indigo-600', action: 'send' },
          { icon: Plus, label: 'Top Up', color: 'bg-emerald-50 text-emerald-600' },
          { icon: ReceiptText, label: 'Bills', color: 'bg-orange-50 text-orange-600' },
          { icon: ArrowUpRight, label: 'Request', color: 'bg-purple-50 text-purple-600' },
        ].map((item, i) => (
          <button 
            key={i} 
            onClick={() => item.action === 'send' && onAction()}
            className="flex flex-col items-center gap-2"
          >
            <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center shadow-sm active:scale-90 transition-transform`}>
              <item.icon size={24} />
            </div>
            <span className="text-xs font-semibold text-slate-600">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
