AFRAME.registerComponent("geo", {
    update: function () {
        let ponto = document.getElementById("ponto");
        let h3 = document.querySelector("h3");
        let h4 = document.querySelector("h4");
        let pH = ["p1", "p2"];
        var areaPoly = [];
        let limitLatitude = null,
            limitLongitude = null;

        //Pontos Casa
        const listCoords = [
            [
                [-48.4787772, -1.4303331], // IE
                [-48.4788029, -1.4303522], // ID
                [-48.4787708, -1.4303955], // SD
                [-48.4787436, -1.4303721], // SE
            ],
            [
                [-48.4788352, -1.4304794], // IE
                [-48.4787887, -1.4304403], // ID
                [-48.4787708, -1.4304074], // SD
                [-48.4788677, -1.4304452], // SE
            ],
        ];

        //Pontos IFPA
        /*const listCoords = [
          [
              [-48.4603586, -1.4384416], // IE
              [-48.460313, -1.4383665], // ID
              [-48.4604867, -1.4382579], // SD
              [-48.4605343, -1.4383263], // SE
          ],
          [
              [-48.4605373, -1.4383266], // IE
              [-48.4604887, -1.4382565], // ID
              [-48.4606611, -1.4381439], // SD
              [-48.4607073, -1.4382066], // SE
          ],
      ];*/

        for (let poly in listCoords) {
            // Cálculo Área
            // Se dois números são negativos o maior é aquele que possui
            // menor valor absoluto, isto é, o valor do número sem o sinal
            // negativo. Se dois números são positivos, o maior é aquele
            let infMax = Math.min(
                listCoords[poly][0][1],
                listCoords[poly][1][1]
            );
            let supMax = Math.max(
                listCoords[poly][2][1],
                listCoords[poly][3][1]
            );
            let esqMax = Math.min(
                listCoords[poly][0][0],
                listCoords[poly][3][0]
            );
            let dirMax = Math.max(
                listCoords[poly][1][0],
                listCoords[poly][2][0]
            );

            //                infMax += 0.0005000;
            //                supMax += 0.0005000;
            //                esqMax += 0.0005000;
            //                dirMax += 0.0005000;

            areaPoly.push({
                inf: infMax,
                sup: supMax,
                esq: esqMax,
                dir: dirMax,
            });
            document.getElementById(
                pH[poly]
            ).textContent = `inf: ${infMax} | sup: ${supMax} | esq: ${esqMax} | dir: ${dirMax}`;
        }

        function success(pos) {
            console.log(success);
            h3.textContent = `Latitude: ${pos.coords.latitude} | Longitude: ${pos.coords.longitude}`;
            for (let pol in areaPoly) {
                limitLatitude = null;
                limitLongitude = null;

                if (areaPoly[pol].esq > pos.coords.longitude)
                    limitLongitude = "E";

                if (areaPoly[pol].dir < pos.coords.longitude)
                    limitLongitude = "D";

                if (areaPoly[pol].inf > pos.coords.latitude) limitLatitude = "I";

                if (areaPoly[pol].sup < pos.coords.latitude) limitLatitude = "S";

                if (limitLatitude === null && limitLongitude === null) {
                    h4.textContent = `Estou no Polígno: ${pol}`;
                    break;
                } else {
                    h4.textContent = `Sair do Polígno (latitude ${limitLatitude} e longitude ${limitLongitude})!`;
                }
            }
        }
        function error(err) {
            // Quando o usuário bloqueia o acesso ao GPS
            console.log(err);
        }

        const watchID = navigator.geolocation.watchPosition(success, error, {
            enableHighAccuracy: true, // maior precisão, mas console mais energia
        });
    },
});