Install dependencies
```
  yarn install
```
Build App
```
  yarn build
```
Run App
```
  yarn start
```

Debug App
```
  yarn start:dev
```

Project Tools (Please install these tools)
- Yarn
- Nodejs
- Postman (For testing server endpoints)

# Getting Started with Integrating Okay to your server

 To proceed with Okay integration, you are required to create an account using this [link](https://okaythis.com/signup). Once you are successfully signed up, login in with the credentials that you used to create the account [here](https://demostand.okaythis.com/multi-tenant-admin/login).

 Once you are logged in to your [dashboard](https://demostand.okaythis.com/pss-admin/dashboard) click on **Tenants** in the top toolbar, then select [**tenants**](https://demostand.okaythis.com/multi-tenant-admin/tenants) from the drop down menu.

 ![Dashboard Toolbar Image](/app/src/public/images/toolbar-tenants.png)

 The [**Tenants**](https://demostand.okaythis.com/multi-tenant-admin/tenants) web page is where you will register your server as a Service Provider that will communicate with Okay servers in order to verify/intiate secure transactions/authentications. Your tenant page should present a table that looks like the table below.

 ![Tenant Table Image](/app/src/public/images/tenant-dashboard.png)

## Overview of the Tenant table

 As you can see, you already have an entry in the **Tenants** table. The contents of that row are essential in understanding how to integrate Okay into your server.

### Tenant ID

 The first column under the table is what we refer to as your **Tenant ID**. In the image above my **Tenant Id** is `40007`. It is very important you take note of this value as we will be using this value for our transactions/authentication.

### Name

 The text under the **Name** column in the **Tenants** table is the name of the company you provided at the time of your sign up. 

### Status

 Specifies the status of your tenant.

### Trial Expiration

 Shows your tenant trial expiration date, if you are on trial mode.

### Actions

![Action Column Image](/app/src/public/images/tenants-action-column.png)

The **Action** column has three buttons that allows us to manage our tenant credentials.

## Adding Credentials to your Tenant

To make our tenant useful we will be adding more information to the tenant to connect properly/securely to Okay servers. Click on the pencil icon under **Actions** to complete the tenant registration.

![Edit Tenant Image](/app/src/public/images/edit-tenant.png)

To be able to recieve feedbacks from Okay servers you will need to add a valid callback url (A callback url is an endpoint on your server that will be used as a point of communication by **Okay** to notify your server about the status of transactions/authentication) to the **Callback** input field. We will also need to generate a secret secure token(or secret) that will be used to verify all transactions by **Okay** secure servers. The token could be any aphanumeric secure string that contains between 0-30 characters and must be kept secret.

**Note:** we will be referring to our **Token** as **secret** in further illustrations.

## How to configure this server

After you have successfully created a tenant on Okay, we can now use our credentials to configure this server to make it work. 

You have to locate the `/app/env/development.env` file in the project folder. Then replace the `TENANT_ID` with your own tenant id and `SECRET` with your tenant secret like so.
```js
// development.env

PSS_BASE_URL = 'https://demostand.okaythis.com'
TENANT_ID =REPLACE_WITH_YOUR_TENANT_ID // change from 50001 to your tenant id
SECRET =REPLACE_WITH_YOUR_TENANT_SECRET // change from secret to your tenant secret
```

If you have set up the variables correctly please run `  yarn start:dev` from the root of this project on your terminal, shell or command line interface.