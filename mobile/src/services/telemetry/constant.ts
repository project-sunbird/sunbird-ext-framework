export class Workflows {
    public static readonly APP = "app";
    public static readonly SESSION = "session";
    public static readonly QR = "qr";
}
export class Environment {
    public static readonly HOME = "home";
    public static readonly COURSE = "course";
    public static readonly LIBRARY = "library";
    public static readonly USER = "user";
    public static readonly SETTINGS = "settings";
}
export class ObjectType {
    public static readonly NOTIFICATION = "notification";
}
export class Mode {
    public static readonly PLAY = "play";
}
export class PageId {
    public static readonly SPLASH_SCREEN = "splash";
    public static readonly LOGIN = "login";
    public static readonly LOGOUT = "logout";
    public static readonly SIGNUP = "signup";
    public static readonly ONBOARDING = "onboarding";
    public static readonly USER_TYPE_SELECTION = "user-type-selection";
    public static readonly HOME = "home";
    public static readonly COURSES = "courses";
    public static readonly LIBRARY = "library";
    public static readonly GROUPS = "groups";
    public static readonly PROFILE = "profile";
    public static readonly COURSE_PAGE_FILTER = "course-page-filter";
    public static readonly LIBRARY_PAGE_FILTER = "library-page-filter";
    public static readonly COURSE_DETAIL = "course-detail";
    public static readonly COLLECTION_DETAIL = "collection-detail";
    public static readonly CONTENT_DETAIL = "content-detail";
    public static readonly SHARE_CONTENT = "share-content";
    public static readonly FLAG_CONTENT = "flag-content";
    public static readonly CONTENT_RATING = "content-rating";
    public static readonly ANNOUNCEMENT_LIST = "announcement-list";
    public static readonly ANNOUNCEMENT_DETAIL = "announcement-detail";
    public static readonly SHARE_ANNOUCEMENT = "share-announcement";
    public static readonly QRCodeScanner = "qr-code-scanner";
    public static readonly SERVER_NOTIFICATION = "server-notifiaction";
    public static readonly LOCAL_NOTIFICATION = "local-notifiaction";
    public static readonly NOTIFICATION_LIST = "notifiaction-list";
    public static readonly SIGNIN_OVERLAY = "signin-overlay";
    public static readonly SETTINGS = "settings";
    public static readonly SETTINGS_LANGUAGE = "settings-language";
    public static readonly SETTINGS_DATASYNC = "settings-datasync";
    public static readonly SETTINGS_DEVICE_TAGS = "settings-device-tags";
    public static readonly SETTINGS_SUPPORTS = "settings-supports";
    public static readonly SETTINGS_ABOUT_US = "settings-abour-us";
    public static readonly ABOUT_APP = "about-app";
}

export class LogType {
    public static readonly NOTIFICATION = "notification";
}
export class LogLevel {
    public static readonly TRACE = "TRACE";
    public static readonly DEBUG = "DEBUG";
    public static readonly INFO = "INFO";
    public static readonly WARN = "WARN";
    public static readonly ERROR = "ERROR";
    public static readonly FATAL = "FATAL";
}
export class LogMessage {
    public static readonly RECEIVED = "Received";
    public static readonly DISPLAYED = "Displayed";
}

export class ImpressionType {
    public static readonly SEARCH = "search";
    public static readonly LIST = "list";
    public static readonly DETAIL = "detail";
    public static readonly VIEW = "view";
    public static readonly EDIT = "edit";
    public static readonly WORKFLOW = "workflow";
}
export class ImpressionSubtype {
    public static readonly QRCodeScanInitiate = "qr-code-scan-initiate";
    public static readonly RATING_POPUP = "rating-popup";
}

export class InteractType {
    public static readonly TOUCH = "TOUCH";
    public static readonly OTHER = "OTHER";
}
export class InteractSubtype {
    public static readonly LOGIN_INITIATE = "login-initiate";
    public static readonly LOGIN_SUCCESS = "login-success";
    public static readonly SIGNUP_INITIATE = "signup-initiate";
    public static readonly LOGOUT_INITIATE = "logout-initiate";
    public static readonly LOGOUT_SUCCESS = "logout-success";
    public static readonly BROWSE_AS_GUEST_CLICKED = "browse-as-guest-clicked";
    public static readonly CONTINUE_CLICKED = "continue-clicked";
    public static readonly TAB_CLICKED = "tab-clicked";
    public static readonly SECTION_VIEWED = "section-viewed";
    public static readonly CONTENT_CLICKED = "content-clicked";
    public static readonly CANCEL = "cancel";
    public static readonly SEARCH_BUTTON_CLICKED = "search-buttonclicked";
    public static readonly FILTER_BUTTON_CLICKED = "filter-button-clicked";
    public static readonly VIEWALL_CLICKED = "view-all-clicked";
    public static readonly SHARE_COURSE_INITIATED = "share-course-initiated";
    public static readonly SHARE_LIBRARY_INITIATED = "share-library-initiated";
    public static readonly SHARE_COURSE_SUCCESS = "share-course-success";
    public static readonly SHARE_LIBRARY_SUCCESS = "share-library-success";
    public static readonly FLAG_INITIATE = "flag-initiated";
    public static readonly FLAG_SUCCESS = "flag-success";
    public static readonly FLAG_FAILED = "flag-failed";
    public static readonly CONTENT_PLAY = "content-play";
    public static readonly QRCodeScanClicked = "qr-code-scanner-clicked";
    public static readonly QRCodeScanSuccess = "qr-code-scan-success";
    public static readonly QRCodeScanCancelled = "qr-code-scan-cancelled";
    public static readonly NOTIFICATION_CLICKED = "notification-clicked";
    public static readonly ANNOUNCEMENT_CLICKED = "announcement-clicked";
    public static readonly SIGNIN_OVERLAY_CLICKED = "signin-overlay-clicked";
    public static readonly SETTINGS_CLICKED = "settings-clicked";
    public static readonly LANGUAGE_CLICKED = "language-clicked";
    public static readonly DATA_SYNC_CLICKED = "data-sync-clicked";
    public static readonly DEVICE_TAGS_CLICKED = "device-tags-clicked";
    public static readonly SUPPORT_CLICKED = "support-clicked";
    public static readonly ABOUT_APP_CLICKED = "about-app-clicked";
    public static readonly SHARE_APP_CLICKED = "share-app-clicked";
    public static readonly SHARE_APP_INITIATED = "share-app-initiated";
    public static readonly SHARE_APP_SUCCESS = "share-app-success";
    public static readonly LANGUAGE_SETTINGS_SUCCESS = "language-settings-success";
    public static readonly MANUALSYNC_INITIATED = "manualsync-initiated";
    public static readonly MANUALSYNC_SUCCESS = "manualsync-success"; 
    public static readonly RATING_CLICKED = "rating-clicked";
    public static readonly RATING_SUBMITTED = "rating-submitted";
}