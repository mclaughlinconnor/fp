import {Component} from 'react';
import * as Notifications from 'expo-notifications';
import {AndroidImportance, NotificationContentInput, NotificationTriggerInput} from 'expo-notifications';
import {PermissionStatus} from 'expo-modules-core';

export class NotificationService extends Component<{}, {}> {
  private notificationPermissions: PermissionStatus = PermissionStatus.UNDETERMINED;

  public async sendNotification(content: NotificationContentInput) {
    if (this.notificationPermissions !== PermissionStatus.GRANTED) {
      console.warn('No notification permissions');

      return
    }

    const trigger: NotificationTriggerInput = null;

    return await Notifications.scheduleNotificationAsync({content, trigger});
  };

  public async notificationInitialise() {
    const permission = await Notifications.getPermissionsAsync();

    if (this.notificationPermissions !== PermissionStatus.GRANTED) {
      const {status} = await Notifications.requestPermissionsAsync();
      this.notificationPermissions = status;
    }

    await Notifications.setNotificationChannelAsync('upload-status', {
      name: 'Upload status',
      importance: AndroidImportance.DEFAULT
    });

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    return permission.status
  };
}
