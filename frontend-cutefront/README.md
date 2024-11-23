
For the moment

in 

/home/sampsa/python3_packages/fastapi-fullstack-cloud-deploy/az-example-deployment

docker-compose -f az-test-deployment.yml up

-> go to http://localhost

SECRET_KEY=changethis
FIRST_SUPERUSER=admin@example.com
FIRST_SUPERUSER_PASSWORD=changethis

## TODO

Widgets so so far..

left sidebar : fapi-sidebar # OK
    Dashboard
    Items
    User Settings
    Admin

stuff on the RHS view:

Dashboard # TODO

Items -> Items Management
    TITLE
    fapi-items: # TODO
        [Add Item] -> add new item # TODO
        item list # fapi-listwidget # OK

User Settings
    TITLE
    tabs : tabwidget # fapi-user-settings
        My Profile # userinfowidget # OK
            user info
            [Edit] -> opens fields
        Password # changepassword # OK
            Password fields
            [Save]
        Appearance # appearancewidget # OK
            Light/dark mode

Admin -> User Management
    TITLE
    [Add User]
    user list # fapi-listwidget # OK




                
..or: 
ContainerWidget.addWidget(widget_instance)
