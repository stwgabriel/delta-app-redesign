self.addEventListener("push", function (event) {
  const body = event.data?.text();
  event.waitUntil(self.registration.showNotification("habits", { body }));
});

self.addEventListener("notificationclick", function (event) {
  console.log("Notification clicked:", event.notification);

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      //   if (clientList.length > 0) {
      //     return clientList[0].focus();
      //   }
      //   clientList[0].focus().then((client) => client.navigate("/doctor/signin"));
      return clients.openWindow("/doctor/signin"); // Change URL as needed
    })
  );

  event.notification.close();
  //   let url = event.notification.data?.url || "https://google.com.br";
  //   event.waitUntil(clients.openWindow(url));
});
