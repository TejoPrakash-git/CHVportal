/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {'admin' | 'manager'} role
 */

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {'active' | 'completed' | 'on-hold'} status
 * @property {number} progress
 * @property {string} startDate
 * @property {string} endDate
 * @property {string[]} team
 */

/**
 * @typedef {Object} Intern
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} position
 * @property {string} startDate
 * @property {string} endDate
 * @property {'active' | 'completed' | 'pending'} status
 * @property {string[]} projects
 * @property {string} [avatar]
 */

/**
 * @typedef {Object} Deadline
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} dueDate
 * @property {'high' | 'medium' | 'low'} priority
 * @property {string} projectId
 * @property {'pending' | 'completed' | 'overdue'} status
 */

/**
 * @typedef {Object} AnalyticsData
 * @property {{ total: number, active: number, completed: number }} projects
 * @property {{ total: number, active: number, completed: number }} interns
 * @property {{ upcoming: number, overdue: number }} deadlines
 */
