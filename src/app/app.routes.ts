import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { UseraddComponent } from './useradd/useradd.component';
import { MasterComponent } from './master/master.component';
import { MastertwoComponent } from './mastertwo/mastertwo.component';
import { AuthGuard } from './auth.guard';
import { AuthUnguard } from './auth.unguard';
import { AddDeviceComponent } from './add-device/add-device.component';
import { DevicelistComponent } from './devicelist/devicelist.component';
import { EditdeviceComponent } from './editdevice/editdevice.component';
import { UserlistComponent } from './userlist/userlist.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: MastertwoComponent,
        children: [
            //{ path: '', redirectTo: '/useradd', pathMatch: 'full' },
            { 
                canActivate: [AuthGuard],path: 'useradd', component: UseraddComponent },
            //{ path: 'login', component: LoginComponent },
            //{ path: 'register', component: RegisterComponent },
            // { 
            //     canActivate: [AuthGuard],path: 'header', component: HeaderComponent },
            { 
                canActivate: [AuthGuard],path: 'userslist', component: UserlistComponent },
            { 
                canActivate: [AuthGuard],path: 'devicelist', component: DevicelistComponent },
            { 
                canActivate: [AuthGuard],path: 'deviceadd', component: AddDeviceComponent },
             { 
               canActivate: [AuthGuard],path: 'editdevice', component: EditdeviceComponent },
            {canActivate: [AuthGuard], path: 'contact', component: ContactComponent, },
            {canActivate: [AuthGuard],path: 'home', component: HomeComponent},
            {canActivate: [AuthGuard],path: 'about', component: AboutComponent}
        ]
    },
    {
        path: '',
        canActivate: [AuthUnguard],
        component: MasterComponent, // Use the AuthGuard to protect the master route
        children: [
            { path: 'login', component: LoginComponent,
            canActivate: [AuthUnguard] },
            { path: 'register', component: RegisterComponent,
            canActivate: [AuthUnguard] },
            { path: 'contact', component: ContactComponent, },
            {path: 'home', component: HomeComponent},
            {path: 'about', component: AboutComponent}
            
            // Define children routes for the master component if needed
        ]
    },
    // {path: 'deviceadd', component: AddDeviceComponent},
    // {path:'login', component:LoginComponent},
    // {path: 'register', component:RegisterComponent},
    // {path:'useradd', component:UseraddComponent},
    // {path: 'header', component:HeaderComponent}
    //{path: 'devicelist', component: DevicelistComponent},
    // { path: '', redirectTo: '/master', pathMatch: 'full' },
    // { path: 'master', component: MasterComponent },
    // { 
    //     path: 'register', component: RegisterComponent 
    // },
    // { 
    //     path: 'login', component: LoginComponent 
    // },
    // { 
    //     path: 'header', component: HeaderComponent 
    // },
    // { 
    //     path: 'useradd', component: UseraddComponent 
    // },
];
// import { Routes } from '@angular/router';
// import { RegisterComponent } from './register/register.component';
// import { LoginComponent } from './login/login.component';
// import { HeaderComponent } from './header/header.component';
// import { UseraddComponent } from './useradd/useradd.component';
// import { MasterComponent } from './master/master.component';
// import { MastertwoComponent } from './mastertwo/mastertwo.component';
// import { AuthGuard } from './auth.guard';
// import { Authunguard } from './auth.unguard';

// export const routes: Routes = [
//     {
//         path: '',
//         canActivate: [AuthGuard], // Protect the routes based on authentication
//         children: [
//             {
//                 path: '',
//                 component: MastertwoComponent,
//                 children: [
//                     { path: 'useradd', component: UseraddComponent },
//                     { path: 'header', component: HeaderComponent }
//                 ]
//             },
//         ]
//     },
//     { 
//         path: '',
//         canActivate: [Authguard],
//         //component: MasterComponent,
//         children: [
//             {
//                 path: '',
//                 component: MastertwoComponent,
//                 children: [
//                     { path: 'useradd', component: UseraddComponent },
//                     { path: 'header', component: HeaderComponent }
//                 ]
//             }
//         ]
//     }
//     // Redirect to MastertwoComponent if logged in
//     //{ path: '', redirectTo: '/useradd', pathMatch: 'full' }
// ];
