# Resolutions

**Post your own and see other's new year's resolutions! [ny-resolutions.com](https://ny-resolutions.com)**


## Screenshots
### Add Resolution
![Add](https://cldup.com/pB_aSM8LSu.png?download=ny-resolutions-add.png)

### View Resolutions
![View Resolutions](https://cldup.com/hCt7ZaGOxq.png?download=ny-resolutions-view.png)

## Structure
The repository is split into 'Server' and 'Web'. The Server directory contains the node express web server with the final web source. The web directory contains the roots jade and sass source code.

Resolutions is based on a MongoDB server connected to an express web server. When a new resolution is added, it is added to the database and broadcasted to all clients using socket.io