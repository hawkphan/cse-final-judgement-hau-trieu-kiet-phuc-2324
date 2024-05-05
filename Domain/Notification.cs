using System.ComponentModel.DataAnnotations;
using Domain.Dtos;

namespace Domain
{
    public class Notification
    {
        [Key]
        public Guid Id { get; set; }
        public double Type { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }
        public double Status { get; set; } // 0 for not yet read, 1 for already read
        public Guid? ReceiverId { get; set; }
        public AppUser Receiver { get; set; }
        public Guid? SenderId { get; set; }
        public AppUser Sender { get; set; }
    }
}


// New Problem Added: Notification informing users about the addition of a new problem to the problem set.
// Problem Solved: Notification alerting users when another user solves a problem, potentially providing a leaderboard or ranking.
// Submission Feedback: Notification providing feedback on a user's code submission, including compilation errors, runtime errors, or accepted solutions.
// Contest Announcement: Notification announcing the start or end of a programming contest, along with details such as contest duration, rules, and problem set.
// Contest Reminder: Notification reminding users about upcoming programming contests they have registered for or expressed interest in.
// Contest Participation: Notification confirming a user's successful registration or participation in a programming contest.
// Ranking Update: Notification updating users on changes in their contest rankings or standings during a programming contest.
// Contest Results: Notification announcing the final results of a programming contest, including winners, scores, and solution statistics.
// Discussion Activity: Notification informing users about activity on discussion threads related to problems, contests, or general topics.
// Friend Activity: Notification showing updates on friends' participation, submissions, or achievements in programming contests.
// System Maintenance: Notification alerting users about scheduled maintenance or downtime of the platform.
// New Feature Announcement: Notification introducing new features, improvements, or updates to the competitive programming platform.
// Code Review Request: Notification requesting feedback or code review from other users on a submitted solution.
// Problem Tagging: Notification indicating that a problem has been tagged or categorized with specific topics or keywords.
// Solution Sharing: Notification sharing users' solutions, code snippets, or explanations for problems they have solved.
// User Following: Notification indicating when a user starts following another user, showing interest in their activity and solutions.
// Achievement Unlocked: Notification celebrating users' achievements, milestones, or accomplishments in competitive programming.
// Contest Invitation: Notification inviting users to participate in private or invitation-only programming contests.
// Policy Updates: Notification informing users about changes in platform policies, terms of service, or community guidelines.
// Feedback Request: Notification soliciting feedback from users on the platform's features, usability, or user experience.