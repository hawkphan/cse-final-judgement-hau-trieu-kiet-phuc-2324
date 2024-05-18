using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;


namespace Application.Interfaces
{
    public class NotificationHub : Hub
    {
        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("ReceiveNotification", message);
        }
        public async Task SendMessageToUser(string userId, string message)
        {
           await Clients.All.SendAsync("ReceiveNotification", userId, message);
        }
    }
}
