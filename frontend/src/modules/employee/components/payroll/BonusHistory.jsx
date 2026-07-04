/**
 * BonusHistory Component
 * Displays performance bonus, festival bonus, and other incentives
 */

import React from 'react';
import { Gift, Award, Zap, TrendingUp } from 'lucide-react';

const BonusHistory = ({ bonuses }) => {
  if (!bonuses || bonuses.length === 0) {
    return null;
  }

  const getBonusIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'performance bonus':
        return Award;
      case 'festival bonus':
        return Gift;
      case 'special bonus':
        return Zap;
      case 'incentive':
        return TrendingUp;
      default:
        return Gift;
    }
  };

  const getBonusColor = (type) => {
    switch (type.toLowerCase()) {
      case 'performance bonus':
        return { bg: 'from-blue-50 to-blue-100', text: 'text-blue-600', icon: 'bg-blue-500' };
      case 'festival bonus':
        return { bg: 'from-pink-50 to-pink-100', text: 'text-pink-600', icon: 'bg-pink-500' };
      case 'special bonus':
        return { bg: 'from-purple-50 to-purple-100', text: 'text-purple-600', icon: 'bg-purple-500' };
      case 'incentive':
        return { bg: 'from-green-50 to-green-100', text: 'text-green-600', icon: 'bg-green-500' };
      default:
        return { bg: 'from-yellow-50 to-yellow-100', text: 'text-yellow-600', icon: 'bg-yellow-500' };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Bonus History</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {bonuses.map((bonus, index) => {
          const Icon = getBonusIcon(bonus.type);
          const colors = getBonusColor(bonus.type);

          return (
            <div
              key={bonus.id}
              className={`bg-gradient-to-br ${colors.bg} rounded-lg p-6 hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${colors.icon} text-white rounded-lg p-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    bonus.status === 'Credited'
                      ? 'bg-green-200 text-green-800'
                      : 'bg-yellow-200 text-yellow-800'
                  }`}
                >
                  {bonus.status}
                </span>
              </div>

              <p className="text-gray-600 text-sm font-medium mb-1">{bonus.type}</p>
              <p className={`text-3xl font-bold ${colors.text} mb-2`}>
                ₹{bonus.amount?.toLocaleString() || '0'}
              </p>
              <p className="text-xs text-gray-600 mb-3">{bonus.description}</p>
              <div className="text-xs text-gray-500 pt-3 border-t border-current border-opacity-20">
                {bonus.month} {bonus.year}
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Bonus Summary */}
      <div className="mt-8 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Bonus Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-600 text-sm mb-1">Total Bonuses</p>
            <p className="text-2xl font-bold text-indigo-600">
              ₹{bonuses.reduce((sum, b) => sum + b.amount, 0)?.toLocaleString() || '0'}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Number of Bonuses</p>
            <p className="text-2xl font-bold text-indigo-600">{bonuses.length}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Average Bonus</p>
            <p className="text-2xl font-bold text-indigo-600">
              ₹{Math.round(bonuses.reduce((sum, b) => sum + b.amount, 0) / bonuses.length)?.toLocaleString() || '0'}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Last Bonus</p>
            <p className="text-2xl font-bold text-indigo-600">
              ₹{bonuses[0]?.amount?.toLocaleString() || '0'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BonusHistory;
