# Personal VPN Setup

If you are interested in computers, technology, programming or hacking, there has been probably at least one time when you've wondered what would be the most secure and affordable VPN that you can get. Most times you end up using a third-party service such as (but not limited to) [Mullvad](https://mullvad.net) or [ProtonVPN](https://protonvpn.com), which are great solutions. Most times you get multiple VPN servers in multiple countries.

I've used NordVPN, [ProtonVPN](https://protonvpn.com) and some others, but unfortunately the servers are most often blocked in public Wi-Fis (for questionable purposes), which is ridiculous. Those are the times that I think I should finally setup my own personal VPN server. 

Finally I was ready to set it up, and I decided to write a blog post about it to lower the threshold for others to do the same.



## Covered topics

- [Choosing the server](#choosing-server)
- [Installing and configuring the server](#installing)
- [Connecting clients](#connecting)
- [Conclusion](#conclusion)



## Installation TL;DR

Instructions put in as few lines as possible.

```
# .env
OVPN_DATA="ovpn_server_data"

# docker-compose.yml
(Shown below at "Installing and configuring server")
```



After setting up files above, you should be able to initialize and run your OpenVPN server using following commands!

```bash
export $(cat .env)

# make sure to replace MY.VPN-SERVER.COM with your server's name.
docker volume create --name "$OVPN_DATA"
docker run -v "$OVPN_DATA:/etc/openvpn" --rm "kylemanna/openvpn" ovpn_genconfig -u "udp://MY.VPN-SERVER.COM"
docker run -v "$OVPN_DATA:/etc/openvpn" --rm -it "kylemanna/openvpn" ovpn_initpki

# start the server!
docker-compose up -d
```



## <a id="choosing-server">Choosing the server</a>

There is a lot of options to choose from, but I ended up choosing the [Dockerized version of OpenVPN Server](https://github.com/kylemanna/docker-openvpn). I personally like to host everything in docker containers and that was such a great option for my personal needs. It even had a quick setup tutorial!

## <a id="installing">Installing and configuring the server</a>

There is multiple ways of installing and configuring the server. I chose to write a docker-compose file and configure the server using an `.env` file.

According to the README in [GitHub](https://github.com/kylemanna/docker-openvpn) we shall choose a name for the volume in which the vpn data (certificates, etcetera) is saved. It is suggested that the name is saved in an environment variable named `OVPN_DATA`.

For the setup, your `.env` file has to have a variable named`OVPN_DATA`. Nothing else is needed, and you can simply run `echo OVPN_DATA=ovpn_server_data > .env`.

After choosing a name for our volume it's time for the server initialization. The following commands are mostly copied from the GitHub README with added `export` command.

```sh
export $(cat .env)

# make sure to replace MY.VPN-SERVER.COM with your server's name.
docker volume create --name "$OVPN_DATA"
docker run -v "$OVPN_DATA:/etc/openvpn" --rm "kylemanna/openvpn" ovpn_genconfig -u "udp://MY.VPN-SERVER.COM"
docker run -v "$OVPN_DATA:/etc/openvpn" --rm -it "kylemanna/openvpn" ovpn_initpki
```

The docker-compose file by itself is not processed in the README, but as I mentioned earlier, I chose to write it myself to save myself some time from later on. In my configuration it looks like following:

```yaml
volumes:
  data:
    name: "${OVPN_DATA}"

services:
  server:
    image: 'kylemanna/openvpn:latest'
    volumes:
      - "data:/etc/openvpn:rw"
    ports:
      - "1194:1194"
    cap_add:
      - "NET_ADMIN"
```

This is pretty much the equivalent of given cli command `docker run -v $OVPN_DATA:/etc/openvpn -d -p 1194:1194/udp --cap-add=NET_ADMIN kylemanna/openvpn`, but by making a docker-compose file you can easily run docker-compose specific commands.

To finally run the server:

```sh
docker-compose up -d
```

## <a id="connecting">Connecting clients</a>

Now to the best part; connecting our clients and generating certificates.

### Connecting with a configuration file

```sh
# edit CLIENT_ID to your client's (possible) identifier
CLIENT_ID="myclient"

docker run -v "$OVPN_DATA:/etc/openvpn" --rm -it kylemanna/openvpn easyrsa build-client-full "$CLIENT_ID" nopass
docker run -v "$OVPN_DATA:/etc/openvpn" --rm kylemanna/openvpn ovpn_getclient "$CLIENT_ID" > "$CLIENT_ID".ovpn

# Finally you can copy the configuration file to your device and remove it from the server
cat "$CLIENT_ID".ovpn && rm "$CLIENT_ID".ovpn
```

### Connecting with a password

Rely on [this Medium article](https://medium.com/@vantintttp/how-to-setup-openvpn-authentication-by-username-and-password-589a97cafd8b)



## <a id="conclusion">Conclusion</a>

At the end it's not that difficult to set up a VPN server for yourself. It also most often secures your data well and can be  