login process:

HTTP POST to http://localhost/api/v1/login/access-token

req payload:
```
-----------------------------311319530637548884244038356670
Content-Disposition: form-data; name="username"

admin@paska.com
-----------------------------311319530637548884244038356670
Content-Disposition: form-data; name="password"

1234
-----------------------------311319530637548884244038356670--
```

In fact, API endpoints are here: http://localhost/docs


from cutefront fullstack example:

DataSource
    // Handles all CRUD operations with the backend
    UP: signals.data // carries array of datums
        ## connect to ListWidget.datums_slot
    IN:
        - create_slot // input: a new datum (without uuid)
        - read_slot // tell data source to refresh itself.  no input
        - update_slot // input: updated datum (with uuid)
        - delete_slot // input: datum uuid
    // NOTE: all slots do signals.datums.emit


LoginSource
    UP:
        signals.  (for the login page)
            login_success // carries auth token --> connect to a slot that uses web Local Storage to store the token & redirect to a new page
            login_fail // carries nothing --> connect to a slot that highlights a warning
                  (for change passwd page)
            change_password_success --> success pop-up
            change_password_fail --> fail pop-up
            


    IN:
        - access_token_slot // does http post with the signal data
        - change_password_slot // sends old, new1, new2 password
    

Once user has been logged in & redirected, it's just an SPA .. different tabs are shown / hidden, etc.


TODO:
    - SPA layout: menus & tabs hidden/show, etc.
        - Each stuff chosen from the left is a different widget .. start by creating the widgets
    - LoginSource
    - UserSource
    - ItemSource
    - Page redirect from javascript



----

menu
    child_activate
        unhighlight all children
    item
    item
        child_activate_slot
            unhighlight all children recursively
            emit signal.activate--> connected to parent.child_activate
            activate self
        item
            clicked:
                emit signal.clicked
                emit signal.activate --> connected to parent.child_activate_slot
                activate self
        item
    item

