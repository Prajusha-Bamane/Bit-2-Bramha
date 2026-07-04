import { mockLeaveRequests, employeeLeaveBalances, companyHolidays, recentActivities } from '../data/mockLeaveData';

export const employeeLeaveService = {
  async getLeaveRequests() {
    return Promise.resolve(mockLeaveRequests);
  },
  async getLeaveRequestById(id) {
    return Promise.resolve(mockLeaveRequests.find((leave) => leave.id === id));
  },
  async createLeaveRequest(payload) {
    return Promise.resolve({
      id: `LV-${mockLeaveRequests.length + 1}`,
      ...payload,
      status: 'Pending',
      appliedDate: new Date().toISOString().split('T')[0],
      approver: 'HR Ops Team',
      comments: payload.comments || 'Submitted from employee self-service portal.',
      timeline: [
        { label: 'Applied', timestamp: new Date().toISOString().split('T')[0] },
        { label: 'Manager Review', timestamp: 'Pending' },
        { label: 'HR Review', timestamp: 'Pending' },
        { label: 'Approved', timestamp: 'Pending' },
      ],
    });
  },
  async updateLeaveRequest(id, payload) {
    return Promise.resolve({ id, ...payload });
  },
  async deleteLeaveRequest(id) {
    return Promise.resolve({ id, deleted: true });
  },
  async getLeaveBalances() {
    return Promise.resolve(employeeLeaveBalances);
  },
  async getHolidays() {
    return Promise.resolve(companyHolidays);
  },
  async getRecentActivity() {
    return Promise.resolve(recentActivities);
  },
};
