import { NgModule } from "@angular/core";
import { ContainerService } from "./container/container.services";
import { CameraService } from "./services/camera.service";
import { Camera } from '@ionic-native/camera';
import { ContentService } from "./services/content/content.service";
import { EventService } from "./services/event/event.service";
import { IonicStorageModule } from "@ionic/storage";
import { TelemetryService } from "./services/telemetry/telemetry.service";
import { TelemetryServiceFactory } from "./services/telemetry/factory";
import { GenieSDKServiceFactory } from "./services/telemetry/geniesdk.service";
import { OAuthService } from "./services/auth/oauth.service";
import { TabsPage } from "./container/tabs/tabs";
import { BasePlugin } from "./plugin.base";
import { AuthService } from "./services/auth/auth.service";
import { ProfileService } from "./services/profile/profile.service";
import { CourseService } from "./services/course/course.service"

@NgModule({
    declarations: [
    ],
    imports: [
        IonicStorageModule.forRoot()
    ],
    providers: [
        ContainerService,
        CameraService,
        Camera,
        ContentService,
        EventService,
        OAuthService,
        AuthService,
        ProfileService,
        CourseService,
        { provide: TelemetryServiceFactory, useClass: GenieSDKServiceFactory },
        TelemetryService
    ],
    exports: [
    ]
})
export class FrameworkModule {

}
