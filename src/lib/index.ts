import { initFirebase, firebaseApp } from './firebase';
import { userStore } from './auth';
import Doc from './Doc.svelte';
import DocRealtime from './DocRealtime.svelte';
import Col from './Col.svelte';
import ColRealtime from './ColRealtime.svelte';
import User from './User.svelte';
import Upload from './Upload.svelte';
import AuthHandler from './AuthHandler.svelte';

export {
    initFirebase,
    firebaseApp,
    userStore,
    Doc,
    DocRealtime,
    Col,
    ColRealtime,
    User,
    Upload,
    AuthHandler
}

