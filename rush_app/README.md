Structure of App:

The views are split into the rick side and the driver side.

Each ride has five possible states: 'unassigned', 'assigned', 'pickedUp', 'unfound', and 'complete'.
A ride is unassigned if Rick has just added a ride after receiving a call about a new ride.
A ride is assigned after Rick assigns a ride to a driver.
A ride is pickedUp if the driver pickedUp the people/unfound if the driver cannot locate them.
A ride is complete if the driver is done and is on his way to the dropoff location.

Upon creation of a driver, the server-side code sends him a text message to URL, which
ends with the driver id. This URL points to a page with the driver's own assigned rides.




