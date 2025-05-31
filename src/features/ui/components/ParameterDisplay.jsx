import React from 'react';

const ParameterDisplay = ({ params, n, e }) => {
  if (params.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 glass rounded-2xl p-4 shadow-xl backdrop-blur-xl z-40 animate-fade-in border border-blue-200/50 dark:border-blue-500/30">
      <h4 className="font-bold text-sm mb-3 text-blue-800 dark:text-blue-200 flex items-center gap-2">
        📝 求めた値
      </h4>
      <div className="text-sm space-y-2 text-blue-700 dark:text-blue-300">
        <div className="font-mono bg-blue-100/50 dark:bg-slate-700/50 px-3 py-2 rounded-lg border border-blue-200/30 dark:border-blue-500/20">
          n = <span className="font-bold text-blue-800 dark:text-blue-200">{n}</span>
        </div>
        <div className="font-mono bg-blue-100/50 dark:bg-slate-700/50 px-3 py-2 rounded-lg border border-blue-200/30 dark:border-blue-500/20">
          e = <span className="font-bold text-blue-800 dark:text-blue-200">{e}</span>
        </div>
        {params.map((param, i) => (
          <div key={i} className="font-mono bg-green-100/50 dark:bg-green-900/30 px-3 py-2 rounded-lg border border-green-200/30 dark:border-green-500/20">
            {param.name} = <span className="font-bold text-green-800 dark:text-green-300">{param.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParameterDisplay;
