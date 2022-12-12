# bookkit-notificator

## Installation
```
npm install -g bookkit-notificator
```

## Usage
```
bookkit-notificator <command> <command parameters>
```

## Commands
```
help      Display this help.
notify    Performs whole magic.
version   Show tool version.
```

## Parameters

### --command string
```help```, ```notify```, ```version``` commands. All these can be used as default commands without providing --command argument.

### -c, --config string
File path to the configuration object.

## Configuration

### configuration.js
```js
module.exports = {
    bookkit: {
        oidcHost: "oidc grantToken uri",
        uri: "bookkit uri",
        name: "bookkit name",
        accessCode1: "access code 1 (permissions to bookkit needed)",
        accessCode2: "access code 2 (permissions to bookkit needed)"
    },
    notifications: {
        // offset value in hours, how old changes should be notified
        offset: 1, 
        email: {
            transportsConfiguration: {
                    // standard nodemailer configuration
                    host: "smtp host address", 
                    port: "port",
                    secure: true,
                    auth: {
                        user: "username",
                        pass: "password"
                    }
            },
        },
        recipients: [
            // list of recipients
            "..."
        ]
    }
}
```

## Logs
logs are automatically stored to the ```%HOME%/.bookkit-notificator/logs``` folder