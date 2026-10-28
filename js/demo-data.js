/* Datos de ejemplo (todos con ejemplo: true). Generados para una "hoy" = 2026-10-28. Categorías y lugares del RGK Santafesino.
   Cada torneo tiene de 1 a 10 fechas (`fechas`); los finalizados guardan una planilla por fecha en `resultadosFechas`
   (`resultados` = fecha 1, para compatibilidad). En el torneo en curso, los tiempos de la fecha 2 y 3 van en f2 / f3.
   Se usan en modo demostración y como semilla de la base (seed/seed.json). */
window.DEMO_DATA = {
 "torneos": [
  {
   "id": "t-2026-verano",
   "nombre": "RGK Santafesino 2026 — Copa Verano",
   "fecha": "2026-02-08",
   "lugar": "Kartódromo de Cañada de Gómez",
   "estado": "finalizado",
   "categorias": [
    {
     "nombre": "110 Escuela",
     "cupo": 12
    },
    {
     "nombre": "150 Varillero",
     "cupo": 10
    },
    {
     "nombre": "125 Internacional",
     "cupo": 8
    }
   ],
   "notas": "Torneo de una sola fecha.",
   "creado": "2026-01-15T13:00:00.000Z",
   "finalizado": "2026-02-08T20:30:00.000Z",
   "ejemplo": true,
   "resultados": {
    "110 Escuela": [
     {
      "inscId": "r-ver-f1-2382",
      "nombre": "Catalina",
      "apellido": "Medina",
      "dni": "50112382",
      "nroKarting": "27",
      "nroMotor": "Rotax Mini Max #3F1335",
      "tiempo": 53396,
      "ok": true,
      "posicion": 1
     },
     {
      "inscId": "r-ver-f1-1346",
      "nombre": "Benjamín",
      "apellido": "Ferreyra",
      "dni": "51001346",
      "nroKarting": "18",
      "nroMotor": "Rotax Mini Max #6C5511",
      "tiempo": 53555,
      "ok": true,
      "posicion": 2
     },
     {
      "inscId": "r-ver-f1-6302",
      "nombre": "Joaquín",
      "apellido": "Aguirre",
      "dni": "50016302",
      "nroKarting": "58",
      "nroMotor": "IAME Puma #91648",
      "tiempo": 54382,
      "ok": true,
      "posicion": 3
     },
     {
      "inscId": "r-ver-f1-1946",
      "nombre": "Lautaro",
      "apellido": "Benítez",
      "dni": "52301946",
      "nroKarting": "15",
      "nroMotor": "IAME Puma #59784",
      "tiempo": 54864,
      "ok": true,
      "posicion": 4
     },
     {
      "inscId": "r-ver-f1-8050",
      "nombre": "Martina",
      "apellido": "Acosta",
      "dni": "51898050",
      "nroKarting": "66",
      "nroMotor": "Rotax Mini Max #3F8697",
      "tiempo": null,
      "ok": false,
      "posicion": null
     },
     {
      "inscId": "r-ver-f1-4695",
      "nombre": "Santino",
      "apellido": "Herrera",
      "dni": "52224695",
      "nroKarting": "97",
      "nroMotor": "IAME Puma #33126",
      "tiempo": null,
      "ok": false,
      "posicion": null
     }
    ],
    "150 Varillero": [
     {
      "inscId": "r-ver-f1-9715",
      "nombre": "Camila",
      "apellido": "Rojas",
      "dni": "49889715",
      "nroKarting": "23",
      "nroMotor": "Rotax #5A7765",
      "tiempo": 50005,
      "ok": true,
      "posicion": 1
     },
     {
      "inscId": "r-ver-f1-4151",
      "nombre": "Franco",
      "apellido": "Godoy",
      "dni": "38884151",
      "nroKarting": "57",
      "nroMotor": "Rotax #9G8068",
      "tiempo": 50578,
      "ok": true,
      "posicion": 2
     },
     {
      "inscId": "r-ver-f1-1634",
      "nombre": "Nicolás",
      "apellido": "Ojeda",
      "dni": "41431634",
      "nroKarting": "86",
      "nroMotor": "IAME X30 #49982",
      "tiempo": 51300,
      "ok": true,
      "posicion": 3
     },
     {
      "inscId": "r-ver-f1-7403",
      "nombre": "Gonzalo",
      "apellido": "Ríos",
      "dni": "24337403",
      "nroKarting": "92",
      "nroMotor": "Rotax #5C6654",
      "tiempo": 51323,
      "ok": true,
      "posicion": 4
     },
     {
      "inscId": "r-ver-f1-8799",
      "nombre": "Facundo",
      "apellido": "Ruiz",
      "dni": "41898799",
      "nroKarting": "52",
      "nroMotor": "IAME X30 #32806",
      "tiempo": 51727,
      "ok": true,
      "posicion": 5
     },
     {
      "inscId": "r-ver-f1-9637",
      "nombre": "Tomás",
      "apellido": "Molina",
      "dni": "50629637",
      "nroKarting": "26",
      "nroMotor": "Rotax #6G2628",
      "tiempo": null,
      "ok": false,
      "posicion": null
     }
    ],
    "125 Internacional": [
     {
      "inscId": "r-ver-f1-1839",
      "nombre": "Federico",
      "apellido": "Vázquez",
      "dni": "23721839",
      "nroKarting": "29",
      "nroMotor": "Rotax #5G8010",
      "tiempo": 46717,
      "ok": true,
      "posicion": 1
     },
     {
      "inscId": "r-ver-f1-3485",
      "nombre": "Martín",
      "apellido": "Fernández",
      "dni": "24683485",
      "nroKarting": "98",
      "nroMotor": "IAME X30 #43894",
      "tiempo": 47336,
      "ok": true,
      "posicion": 2
     },
     {
      "inscId": "r-ver-f1-0877",
      "nombre": "Pablo",
      "apellido": "Correa",
      "dni": "43180877",
      "nroKarting": "63",
      "nroMotor": "Rotax #1B3640",
      "tiempo": 47943,
      "ok": true,
      "posicion": 3
     },
     {
      "inscId": "r-ver-f1-7799",
      "nombre": "Rodrigo",
      "apellido": "Bustos",
      "dni": "32907799",
      "nroKarting": "16",
      "nroMotor": "Rotax #9C5769",
      "tiempo": 48268,
      "ok": true,
      "posicion": 4
     },
     {
      "inscId": "r-ver-f1-8614",
      "nombre": "Diego",
      "apellido": "Álvarez",
      "dni": "30018614",
      "nroKarting": "61",
      "nroMotor": "Rotax #3B8140",
      "tiempo": 48427,
      "ok": true,
      "posicion": 5
     },
     {
      "inscId": "r-ver-f1-2951",
      "nombre": "Hernán",
      "apellido": "Maidana",
      "dni": "31222951",
      "nroKarting": "55",
      "nroMotor": "Rotax #7B7879",
      "tiempo": 49037,
      "ok": true,
      "posicion": 6
     }
    ]
   }
  },
  {
   "id": "t-2026-invierno",
   "nombre": "RGK Santafesino 2026 — Copa Invierno",
   "fecha": "2026-06-14",
   "fechas": [
    "2026-06-14",
    "2026-07-12"
   ],
   "lugar": "Kartódromo de Rafaela",
   "estado": "finalizado",
   "categorias": [
    {
     "nombre": "110 Escuela",
     "cupo": 12
    },
    {
     "nombre": "150 Varillero",
     "cupo": 10
    },
    {
     "nombre": "125 Internacional",
     "cupo": 8
    }
   ],
   "notas": "",
   "creado": "2026-05-20T13:00:00.000Z",
   "finalizado": "2026-07-12T21:10:00.000Z",
   "ejemplo": true,
   "resultadosFechas": {
    "1": {
     "110 Escuela": [
      {
       "inscId": "r-inv-f1-2829",
       "nombre": "Gustavo",
       "apellido": "Paz",
       "dni": "31602829",
       "nroKarting": "2",
       "nroMotor": "IAME Puma #19539",
       "tiempo": 52973,
       "ok": true,
       "posicion": 1
      },
      {
       "inscId": "r-inv-f1-4626",
       "nombre": "Lucía",
       "apellido": "Ledesma",
       "dni": "43864626",
       "nroKarting": "33",
       "nroMotor": "Rotax Mini Max #9H3664",
       "tiempo": 53205,
       "ok": true,
       "posicion": 2
      },
      {
       "inscId": "r-inv-f1-0128",
       "nombre": "Valentina",
       "apellido": "Sosa",
       "dni": "52790128",
       "nroKarting": "99",
       "nroMotor": "Rotax Mini Max #7C7705",
       "tiempo": 53563,
       "ok": true,
       "posicion": 3
      },
      {
       "inscId": "r-inv-f1-8050",
       "nombre": "Martina",
       "apellido": "Acosta",
       "dni": "51898050",
       "nroKarting": "66",
       "nroMotor": "Rotax Mini Max #3F8697",
       "tiempo": 54188,
       "ok": true,
       "posicion": 4
      },
      {
       "inscId": "r-inv-f1-1829",
       "nombre": "Mía",
       "apellido": "Domínguez",
       "dni": "50451829",
       "nroKarting": "82",
       "nroMotor": "Rotax Mini Max #8F7960",
       "tiempo": 54536,
       "ok": true,
       "posicion": 5
      },
      {
       "inscId": "r-inv-f1-6302",
       "nombre": "Joaquín",
       "apellido": "Aguirre",
       "dni": "50016302",
       "nroKarting": "58",
       "nroMotor": "IAME Puma #91648",
       "tiempo": 54919,
       "ok": true,
       "posicion": 6
      },
      {
       "inscId": "r-inv-f1-2382",
       "nombre": "Catalina",
       "apellido": "Medina",
       "dni": "50112382",
       "nroKarting": "27",
       "nroMotor": "Rotax Mini Max #3F1335",
       "tiempo": null,
       "ok": false,
       "posicion": null
      }
     ],
     "150 Varillero": [
      {
       "inscId": "r-inv-f1-4151",
       "nombre": "Franco",
       "apellido": "Godoy",
       "dni": "38884151",
       "nroKarting": "57",
       "nroMotor": "Rotax #9G8068",
       "tiempo": 49730,
       "ok": true,
       "posicion": 1
      },
      {
       "inscId": "r-inv-f1-7403",
       "nombre": "Gonzalo",
       "apellido": "Ríos",
       "dni": "24337403",
       "nroKarting": "92",
       "nroMotor": "Rotax #5C6654",
       "tiempo": 49940,
       "ok": true,
       "posicion": 2
      },
      {
       "inscId": "r-inv-f1-6716",
       "nombre": "Agustín",
       "apellido": "Castro",
       "dni": "26346716",
       "nroKarting": "74",
       "nroMotor": "IAME X30 #76596",
       "tiempo": 50082,
       "ok": true,
       "posicion": 3
      },
      {
       "inscId": "r-inv-f1-6213",
       "nombre": "Matías",
       "apellido": "Peralta",
       "dni": "41806213",
       "nroKarting": "30",
       "nroMotor": "Rotax #7E6544",
       "tiempo": 51374,
       "ok": true,
       "posicion": 4
      },
      {
       "inscId": "r-inv-f1-3724",
       "nombre": "Sofía",
       "apellido": "Cabrera",
       "dni": "51493724",
       "nroKarting": "34",
       "nroMotor": "Rotax #6H2317",
       "tiempo": 51519,
       "ok": true,
       "posicion": 5
      },
      {
       "inscId": "r-inv-f1-1634",
       "nombre": "Nicolás",
       "apellido": "Ojeda",
       "dni": "41431634",
       "nroKarting": "86",
       "nroMotor": "IAME X30 #49982",
       "tiempo": 51553,
       "ok": true,
       "posicion": 6
      },
      {
       "inscId": "r-inv-f1-8799",
       "nombre": "Facundo",
       "apellido": "Ruiz",
       "dni": "41898799",
       "nroKarting": "52",
       "nroMotor": "IAME X30 #32806",
       "tiempo": 51924,
       "ok": true,
       "posicion": 7
      }
     ],
     "125 Internacional": [
      {
       "inscId": "r-inv-f1-2874",
       "nombre": "Sebastián",
       "apellido": "Luna",
       "dni": "38562874",
       "nroKarting": "20",
       "nroMotor": "IAME X30 #28642",
       "tiempo": 47469,
       "ok": true,
       "posicion": 1
      },
      {
       "inscId": "r-inv-f1-0231",
       "nombre": "Leandro",
       "apellido": "Suárez",
       "dni": "42380231",
       "nroKarting": "80",
       "nroMotor": "IAME X30 #27975",
       "tiempo": 47529,
       "ok": true,
       "posicion": 2
      },
      {
       "inscId": "r-inv-f1-1839",
       "nombre": "Federico",
       "apellido": "Vázquez",
       "dni": "23721839",
       "nroKarting": "29",
       "nroMotor": "Rotax #5G8010",
       "tiempo": 47728,
       "ok": true,
       "posicion": 3
      },
      {
       "inscId": "r-inv-f1-0877",
       "nombre": "Pablo",
       "apellido": "Correa",
       "dni": "43180877",
       "nroKarting": "63",
       "nroMotor": "Rotax #1B3640",
       "tiempo": 47763,
       "ok": true,
       "posicion": 4
      },
      {
       "inscId": "r-inv-f1-2951",
       "nombre": "Hernán",
       "apellido": "Maidana",
       "dni": "31222951",
       "nroKarting": "55",
       "nroMotor": "Rotax #7B7879",
       "tiempo": 48381,
       "ok": true,
       "posicion": 5
      },
      {
       "inscId": "r-inv-f1-3485",
       "nombre": "Martín",
       "apellido": "Fernández",
       "dni": "24683485",
       "nroKarting": "98",
       "nroMotor": "IAME X30 #43894",
       "tiempo": 49092,
       "ok": true,
       "posicion": 6
      },
      {
       "inscId": "r-inv-f1-8614",
       "nombre": "Diego",
       "apellido": "Álvarez",
       "dni": "30018614",
       "nroKarting": "61",
       "nroMotor": "Rotax #3B8140",
       "tiempo": null,
       "ok": false,
       "posicion": null
      }
     ]
    },
    "2": {
     "110 Escuela": [
      {
       "inscId": "r-inv-f2-1346",
       "nombre": "Benjamín",
       "apellido": "Ferreyra",
       "dni": "51001346",
       "nroKarting": "18",
       "nroMotor": "Rotax Mini Max #6C5511",
       "tiempo": 53149,
       "ok": true,
       "posicion": 1
      },
      {
       "inscId": "r-inv-f2-1946",
       "nombre": "Lautaro",
       "apellido": "Benítez",
       "dni": "52301946",
       "nroKarting": "15",
       "nroMotor": "IAME Puma #59784",
       "tiempo": 53227,
       "ok": true,
       "posicion": 2
      },
      {
       "inscId": "r-inv-f2-2382",
       "nombre": "Catalina",
       "apellido": "Medina",
       "dni": "50112382",
       "nroKarting": "27",
       "nroMotor": "Rotax Mini Max #3F1335",
       "tiempo": 54482,
       "ok": true,
       "posicion": 3
      },
      {
       "inscId": "r-inv-f2-8050",
       "nombre": "Martina",
       "apellido": "Acosta",
       "dni": "51898050",
       "nroKarting": "66",
       "nroMotor": "Rotax Mini Max #3F8697",
       "tiempo": 54597,
       "ok": true,
       "posicion": 4
      },
      {
       "inscId": "r-inv-f2-0128",
       "nombre": "Valentina",
       "apellido": "Sosa",
       "dni": "52790128",
       "nroKarting": "99",
       "nroMotor": "Rotax Mini Max #7C7705",
       "tiempo": 54763,
       "ok": true,
       "posicion": 5
      },
      {
       "inscId": "r-inv-f2-4626",
       "nombre": "Lucía",
       "apellido": "Ledesma",
       "dni": "43864626",
       "nroKarting": "33",
       "nroMotor": "Rotax Mini Max #9H3664",
       "tiempo": 54780,
       "ok": true,
       "posicion": 6
      },
      {
       "inscId": "r-inv-f2-1714",
       "nombre": "Felipe",
       "apellido": "Quiroga",
       "dni": "51481714",
       "nroKarting": "21",
       "nroMotor": "Rotax Mini Max #1B1436",
       "tiempo": null,
       "ok": false,
       "posicion": null
      }
     ],
     "150 Varillero": [
      {
       "inscId": "r-inv-f2-6213",
       "nombre": "Matías",
       "apellido": "Peralta",
       "dni": "41806213",
       "nroKarting": "30",
       "nroMotor": "Rotax #7E6544",
       "tiempo": 49525,
       "ok": true,
       "posicion": 1
      },
      {
       "inscId": "r-inv-f2-6716",
       "nombre": "Agustín",
       "apellido": "Castro",
       "dni": "26346716",
       "nroKarting": "74",
       "nroMotor": "IAME X30 #76596",
       "tiempo": 49541,
       "ok": true,
       "posicion": 2
      },
      {
       "inscId": "r-inv-f2-4151",
       "nombre": "Franco",
       "apellido": "Godoy",
       "dni": "38884151",
       "nroKarting": "57",
       "nroMotor": "Rotax #9G8068",
       "tiempo": 50585,
       "ok": true,
       "posicion": 3
      },
      {
       "inscId": "r-inv-f2-9715",
       "nombre": "Camila",
       "apellido": "Rojas",
       "dni": "49889715",
       "nroKarting": "23",
       "nroMotor": "Rotax #5A7765",
       "tiempo": 50713,
       "ok": true,
       "posicion": 4
      },
      {
       "inscId": "r-inv-f2-3724",
       "nombre": "Sofía",
       "apellido": "Cabrera",
       "dni": "51493724",
       "nroKarting": "34",
       "nroMotor": "Rotax #6H2317",
       "tiempo": 51260,
       "ok": true,
       "posicion": 5
      },
      {
       "inscId": "r-inv-f2-7403",
       "nombre": "Gonzalo",
       "apellido": "Ríos",
       "dni": "24337403",
       "nroKarting": "92",
       "nroMotor": "Rotax #5C6654",
       "tiempo": 51702,
       "ok": true,
       "posicion": 6
      },
      {
       "inscId": "r-inv-f2-9637",
       "nombre": "Tomás",
       "apellido": "Molina",
       "dni": "50629637",
       "nroKarting": "26",
       "nroMotor": "Rotax #6G2628",
       "tiempo": null,
       "ok": false,
       "posicion": null
      }
     ],
     "125 Internacional": [
      {
       "inscId": "r-inv-f2-8614",
       "nombre": "Diego",
       "apellido": "Álvarez",
       "dni": "30018614",
       "nroKarting": "61",
       "nroMotor": "Rotax #3B8140",
       "tiempo": 46590,
       "ok": true,
       "posicion": 1
      },
      {
       "inscId": "r-inv-f2-0877",
       "nombre": "Pablo",
       "apellido": "Correa",
       "dni": "43180877",
       "nroKarting": "63",
       "nroMotor": "Rotax #1B3640",
       "tiempo": 46802,
       "ok": true,
       "posicion": 2
      },
      {
       "inscId": "r-inv-f2-1839",
       "nombre": "Federico",
       "apellido": "Vázquez",
       "dni": "23721839",
       "nroKarting": "29",
       "nroMotor": "Rotax #5G8010",
       "tiempo": 46853,
       "ok": true,
       "posicion": 3
      },
      {
       "inscId": "r-inv-f2-3689",
       "nombre": "Ezequiel",
       "apellido": "Moreno",
       "dni": "39613689",
       "nroKarting": "96",
       "nroMotor": "Rotax #3D9647",
       "tiempo": 46904,
       "ok": true,
       "posicion": 4
      },
      {
       "inscId": "r-inv-f2-7799",
       "nombre": "Rodrigo",
       "apellido": "Bustos",
       "dni": "32907799",
       "nroKarting": "16",
       "nroMotor": "Rotax #9C5769",
       "tiempo": 46971,
       "ok": true,
       "posicion": 5
      },
      {
       "inscId": "r-inv-f2-8153",
       "nombre": "Carla",
       "apellido": "Villalba",
       "dni": "35948153",
       "nroKarting": "41",
       "nroMotor": "IAME X30 #81680",
       "tiempo": 47081,
       "ok": true,
       "posicion": 6
      },
      {
       "inscId": "r-inv-f2-2874",
       "nombre": "Sebastián",
       "apellido": "Luna",
       "dni": "38562874",
       "nroKarting": "20",
       "nroMotor": "IAME X30 #28642",
       "tiempo": 47837,
       "ok": true,
       "posicion": 7
      }
     ]
    }
   },
   "resultados": {
    "110 Escuela": [
     {
      "inscId": "r-inv-f1-2829",
      "nombre": "Gustavo",
      "apellido": "Paz",
      "dni": "31602829",
      "nroKarting": "2",
      "nroMotor": "IAME Puma #19539",
      "tiempo": 52973,
      "ok": true,
      "posicion": 1
     },
     {
      "inscId": "r-inv-f1-4626",
      "nombre": "Lucía",
      "apellido": "Ledesma",
      "dni": "43864626",
      "nroKarting": "33",
      "nroMotor": "Rotax Mini Max #9H3664",
      "tiempo": 53205,
      "ok": true,
      "posicion": 2
     },
     {
      "inscId": "r-inv-f1-0128",
      "nombre": "Valentina",
      "apellido": "Sosa",
      "dni": "52790128",
      "nroKarting": "99",
      "nroMotor": "Rotax Mini Max #7C7705",
      "tiempo": 53563,
      "ok": true,
      "posicion": 3
     },
     {
      "inscId": "r-inv-f1-8050",
      "nombre": "Martina",
      "apellido": "Acosta",
      "dni": "51898050",
      "nroKarting": "66",
      "nroMotor": "Rotax Mini Max #3F8697",
      "tiempo": 54188,
      "ok": true,
      "posicion": 4
     },
     {
      "inscId": "r-inv-f1-1829",
      "nombre": "Mía",
      "apellido": "Domínguez",
      "dni": "50451829",
      "nroKarting": "82",
      "nroMotor": "Rotax Mini Max #8F7960",
      "tiempo": 54536,
      "ok": true,
      "posicion": 5
     },
     {
      "inscId": "r-inv-f1-6302",
      "nombre": "Joaquín",
      "apellido": "Aguirre",
      "dni": "50016302",
      "nroKarting": "58",
      "nroMotor": "IAME Puma #91648",
      "tiempo": 54919,
      "ok": true,
      "posicion": 6
     },
     {
      "inscId": "r-inv-f1-2382",
      "nombre": "Catalina",
      "apellido": "Medina",
      "dni": "50112382",
      "nroKarting": "27",
      "nroMotor": "Rotax Mini Max #3F1335",
      "tiempo": null,
      "ok": false,
      "posicion": null
     }
    ],
    "150 Varillero": [
     {
      "inscId": "r-inv-f1-4151",
      "nombre": "Franco",
      "apellido": "Godoy",
      "dni": "38884151",
      "nroKarting": "57",
      "nroMotor": "Rotax #9G8068",
      "tiempo": 49730,
      "ok": true,
      "posicion": 1
     },
     {
      "inscId": "r-inv-f1-7403",
      "nombre": "Gonzalo",
      "apellido": "Ríos",
      "dni": "24337403",
      "nroKarting": "92",
      "nroMotor": "Rotax #5C6654",
      "tiempo": 49940,
      "ok": true,
      "posicion": 2
     },
     {
      "inscId": "r-inv-f1-6716",
      "nombre": "Agustín",
      "apellido": "Castro",
      "dni": "26346716",
      "nroKarting": "74",
      "nroMotor": "IAME X30 #76596",
      "tiempo": 50082,
      "ok": true,
      "posicion": 3
     },
     {
      "inscId": "r-inv-f1-6213",
      "nombre": "Matías",
      "apellido": "Peralta",
      "dni": "41806213",
      "nroKarting": "30",
      "nroMotor": "Rotax #7E6544",
      "tiempo": 51374,
      "ok": true,
      "posicion": 4
     },
     {
      "inscId": "r-inv-f1-3724",
      "nombre": "Sofía",
      "apellido": "Cabrera",
      "dni": "51493724",
      "nroKarting": "34",
      "nroMotor": "Rotax #6H2317",
      "tiempo": 51519,
      "ok": true,
      "posicion": 5
     },
     {
      "inscId": "r-inv-f1-1634",
      "nombre": "Nicolás",
      "apellido": "Ojeda",
      "dni": "41431634",
      "nroKarting": "86",
      "nroMotor": "IAME X30 #49982",
      "tiempo": 51553,
      "ok": true,
      "posicion": 6
     },
     {
      "inscId": "r-inv-f1-8799",
      "nombre": "Facundo",
      "apellido": "Ruiz",
      "dni": "41898799",
      "nroKarting": "52",
      "nroMotor": "IAME X30 #32806",
      "tiempo": 51924,
      "ok": true,
      "posicion": 7
     }
    ],
    "125 Internacional": [
     {
      "inscId": "r-inv-f1-2874",
      "nombre": "Sebastián",
      "apellido": "Luna",
      "dni": "38562874",
      "nroKarting": "20",
      "nroMotor": "IAME X30 #28642",
      "tiempo": 47469,
      "ok": true,
      "posicion": 1
     },
     {
      "inscId": "r-inv-f1-0231",
      "nombre": "Leandro",
      "apellido": "Suárez",
      "dni": "42380231",
      "nroKarting": "80",
      "nroMotor": "IAME X30 #27975",
      "tiempo": 47529,
      "ok": true,
      "posicion": 2
     },
     {
      "inscId": "r-inv-f1-1839",
      "nombre": "Federico",
      "apellido": "Vázquez",
      "dni": "23721839",
      "nroKarting": "29",
      "nroMotor": "Rotax #5G8010",
      "tiempo": 47728,
      "ok": true,
      "posicion": 3
     },
     {
      "inscId": "r-inv-f1-0877",
      "nombre": "Pablo",
      "apellido": "Correa",
      "dni": "43180877",
      "nroKarting": "63",
      "nroMotor": "Rotax #1B3640",
      "tiempo": 47763,
      "ok": true,
      "posicion": 4
     },
     {
      "inscId": "r-inv-f1-2951",
      "nombre": "Hernán",
      "apellido": "Maidana",
      "dni": "31222951",
      "nroKarting": "55",
      "nroMotor": "Rotax #7B7879",
      "tiempo": 48381,
      "ok": true,
      "posicion": 5
     },
     {
      "inscId": "r-inv-f1-3485",
      "nombre": "Martín",
      "apellido": "Fernández",
      "dni": "24683485",
      "nroKarting": "98",
      "nroMotor": "IAME X30 #43894",
      "tiempo": 49092,
      "ok": true,
      "posicion": 6
     },
     {
      "inscId": "r-inv-f1-8614",
      "nombre": "Diego",
      "apellido": "Álvarez",
      "dni": "30018614",
      "nroKarting": "61",
      "nroMotor": "Rotax #3B8140",
      "tiempo": null,
      "ok": false,
      "posicion": null
     }
    ]
   }
  },
  {
   "id": "t-2026-apertura",
   "nombre": "RGK Santafesino 2026 — Torneo Apertura",
   "fecha": "2026-08-16",
   "fechas": [
    "2026-08-16",
    "2026-09-13",
    "2026-10-04"
   ],
   "lugar": "Kartódromo de Cañada de Gómez",
   "estado": "finalizado",
   "categorias": [
    {
     "nombre": "110 Escuela",
     "cupo": 12
    },
    {
     "nombre": "150 Varillero",
     "cupo": 10
    },
    {
     "nombre": "125 Internacional",
     "cupo": 8
    }
   ],
   "notas": "Fecha 2 con pista húmeda en la primera tanda.",
   "creado": "2026-07-20T14:05:00.000Z",
   "finalizado": "2026-10-04T20:55:00.000Z",
   "resultados": {
    "110 Escuela": [
     {
      "inscId": "r-f1-13",
      "nombre": "Gustavo",
      "apellido": "Paz",
      "dni": "31602829",
      "nroKarting": "2",
      "nroMotor": "IAME Puma #19539",
      "tiempo": 52595,
      "ok": true,
      "posicion": 1
     },
     {
      "inscId": "r-f1-09",
      "nombre": "Joaquín",
      "apellido": "Aguirre",
      "dni": "50016302",
      "nroKarting": "58",
      "nroMotor": "IAME Puma #91648",
      "tiempo": 52847,
      "ok": true,
      "posicion": 2
     },
     {
      "inscId": "r-f1-06",
      "nombre": "Lautaro",
      "apellido": "Benítez",
      "dni": "52301946",
      "nroKarting": "15",
      "nroMotor": "IAME Puma #59784",
      "tiempo": 53460,
      "ok": true,
      "posicion": 3
     },
     {
      "inscId": "r-f1-01",
      "nombre": "Benjamín",
      "apellido": "Ferreyra",
      "dni": "51001346",
      "nroKarting": "18",
      "nroMotor": "Rotax Mini Max #6C5511",
      "tiempo": 53604,
      "ok": true,
      "posicion": 4
     },
     {
      "inscId": "r-f1-10",
      "nombre": "Mía",
      "apellido": "Domínguez",
      "dni": "50451829",
      "nroKarting": "82",
      "nroMotor": "Rotax Mini Max #8F7960",
      "tiempo": 53716,
      "ok": true,
      "posicion": 5
     },
     {
      "inscId": "r-f1-11",
      "nombre": "Felipe",
      "apellido": "Quiroga",
      "dni": "51481714",
      "nroKarting": "21",
      "nroMotor": "Rotax Mini Max #1B1436",
      "tiempo": 54099,
      "ok": true,
      "posicion": 6
     },
     {
      "inscId": "r-f1-12",
      "nombre": "Lucía",
      "apellido": "Ledesma",
      "dni": "43864626",
      "nroKarting": "33",
      "nroMotor": "Rotax Mini Max #9H3664",
      "tiempo": 54375,
      "ok": true,
      "posicion": 7
     },
     {
      "inscId": "r-f1-03",
      "nombre": "Thiago",
      "apellido": "Giménez",
      "dni": "51386584",
      "nroKarting": "59",
      "nroMotor": "Rotax Mini Max #3D8173",
      "tiempo": 54418,
      "ok": true,
      "posicion": 8
     },
     {
      "inscId": "r-f1-04",
      "nombre": "Martina",
      "apellido": "Acosta",
      "dni": "51898050",
      "nroKarting": "66",
      "nroMotor": "Rotax Mini Max #3F8697",
      "tiempo": null,
      "ok": false,
      "posicion": null
     }
    ],
    "150 Varillero": [
     {
      "inscId": "r-f1-14",
      "nombre": "Tomás",
      "apellido": "Molina",
      "dni": "50629637",
      "nroKarting": "26",
      "nroMotor": "Rotax #6G2628",
      "tiempo": 49441,
      "ok": true,
      "posicion": 1
     },
     {
      "inscId": "r-f1-15",
      "nombre": "Agustín",
      "apellido": "Castro",
      "dni": "26346716",
      "nroKarting": "74",
      "nroMotor": "IAME X30 #76596",
      "tiempo": 49659,
      "ok": true,
      "posicion": 2
     },
     {
      "inscId": "r-f1-18",
      "nombre": "Nicolás",
      "apellido": "Ojeda",
      "dni": "41431634",
      "nroKarting": "86",
      "nroMotor": "IAME X30 #49982",
      "tiempo": 49965,
      "ok": true,
      "posicion": 3
     },
     {
      "inscId": "r-f1-24",
      "nombre": "Sofía",
      "apellido": "Cabrera",
      "dni": "51493724",
      "nroKarting": "34",
      "nroMotor": "Rotax #6H2317",
      "tiempo": 50193,
      "ok": true,
      "posicion": 4
     },
     {
      "inscId": "r-f1-22",
      "nombre": "Matías",
      "apellido": "Peralta",
      "dni": "41806213",
      "nroKarting": "30",
      "nroMotor": "Rotax #7E6544",
      "tiempo": 50820,
      "ok": true,
      "posicion": 5
     },
     {
      "inscId": "r-f1-16",
      "nombre": "Camila",
      "apellido": "Rojas",
      "dni": "49889715",
      "nroKarting": "23",
      "nroMotor": "Rotax #5A7765",
      "tiempo": 51268,
      "ok": true,
      "posicion": 6
     },
     {
      "inscId": "r-f1-23",
      "nombre": "Gonzalo",
      "apellido": "Ríos",
      "dni": "24337403",
      "nroKarting": "92",
      "nroMotor": "Rotax #5C6654",
      "tiempo": null,
      "ok": false,
      "posicion": null
     }
    ],
    "125 Internacional": [
     {
      "inscId": "r-f1-30",
      "nombre": "Hernán",
      "apellido": "Maidana",
      "dni": "31222951",
      "nroKarting": "55",
      "nroMotor": "Rotax #7B7879",
      "tiempo": 46498,
      "ok": true,
      "posicion": 1
     },
     {
      "inscId": "r-f1-28",
      "nombre": "Pablo",
      "apellido": "Correa",
      "dni": "43180877",
      "nroKarting": "63",
      "nroMotor": "Rotax #1B3640",
      "tiempo": 46602,
      "ok": true,
      "posicion": 2
     },
     {
      "inscId": "r-f1-32",
      "nombre": "Rodrigo",
      "apellido": "Bustos",
      "dni": "32907799",
      "nroKarting": "16",
      "nroMotor": "Rotax #9C5769",
      "tiempo": 46884,
      "ok": true,
      "posicion": 3
     },
     {
      "inscId": "r-f1-27",
      "nombre": "Leandro",
      "apellido": "Suárez",
      "dni": "42380231",
      "nroKarting": "80",
      "nroMotor": "IAME X30 #27975",
      "tiempo": 47410,
      "ok": true,
      "posicion": 4
     },
     {
      "inscId": "r-f1-29",
      "nombre": "Sebastián",
      "apellido": "Luna",
      "dni": "38562874",
      "nroKarting": "20",
      "nroMotor": "IAME X30 #28642",
      "tiempo": 47670,
      "ok": true,
      "posicion": 5
     },
     {
      "inscId": "r-f1-34",
      "nombre": "Carla",
      "apellido": "Villalba",
      "dni": "35948153",
      "nroKarting": "41",
      "nroMotor": "IAME X30 #81680",
      "tiempo": 47852,
      "ok": true,
      "posicion": 6
     },
     {
      "inscId": "r-f1-26",
      "nombre": "Diego",
      "apellido": "Álvarez",
      "dni": "30018614",
      "nroKarting": "61",
      "nroMotor": "Rotax #3B8140",
      "tiempo": 47954,
      "ok": true,
      "posicion": 7
     },
     {
      "inscId": "r-f1-33",
      "nombre": "Emiliano",
      "apellido": "Ortiz",
      "dni": "40764201",
      "nroKarting": "60",
      "nroMotor": "IAME X30 #84568",
      "tiempo": null,
      "ok": false,
      "posicion": null
     }
    ]
   },
   "resultadosFechas": {
    "1": {
     "110 Escuela": [
      {
       "inscId": "r-f1-13",
       "nombre": "Gustavo",
       "apellido": "Paz",
       "dni": "31602829",
       "nroKarting": "2",
       "nroMotor": "IAME Puma #19539",
       "tiempo": 52595,
       "ok": true,
       "posicion": 1
      },
      {
       "inscId": "r-f1-09",
       "nombre": "Joaquín",
       "apellido": "Aguirre",
       "dni": "50016302",
       "nroKarting": "58",
       "nroMotor": "IAME Puma #91648",
       "tiempo": 52847,
       "ok": true,
       "posicion": 2
      },
      {
       "inscId": "r-f1-06",
       "nombre": "Lautaro",
       "apellido": "Benítez",
       "dni": "52301946",
       "nroKarting": "15",
       "nroMotor": "IAME Puma #59784",
       "tiempo": 53460,
       "ok": true,
       "posicion": 3
      },
      {
       "inscId": "r-f1-01",
       "nombre": "Benjamín",
       "apellido": "Ferreyra",
       "dni": "51001346",
       "nroKarting": "18",
       "nroMotor": "Rotax Mini Max #6C5511",
       "tiempo": 53604,
       "ok": true,
       "posicion": 4
      },
      {
       "inscId": "r-f1-10",
       "nombre": "Mía",
       "apellido": "Domínguez",
       "dni": "50451829",
       "nroKarting": "82",
       "nroMotor": "Rotax Mini Max #8F7960",
       "tiempo": 53716,
       "ok": true,
       "posicion": 5
      },
      {
       "inscId": "r-f1-11",
       "nombre": "Felipe",
       "apellido": "Quiroga",
       "dni": "51481714",
       "nroKarting": "21",
       "nroMotor": "Rotax Mini Max #1B1436",
       "tiempo": 54099,
       "ok": true,
       "posicion": 6
      },
      {
       "inscId": "r-f1-12",
       "nombre": "Lucía",
       "apellido": "Ledesma",
       "dni": "43864626",
       "nroKarting": "33",
       "nroMotor": "Rotax Mini Max #9H3664",
       "tiempo": 54375,
       "ok": true,
       "posicion": 7
      },
      {
       "inscId": "r-f1-03",
       "nombre": "Thiago",
       "apellido": "Giménez",
       "dni": "51386584",
       "nroKarting": "59",
       "nroMotor": "Rotax Mini Max #3D8173",
       "tiempo": 54418,
       "ok": true,
       "posicion": 8
      },
      {
       "inscId": "r-f1-04",
       "nombre": "Martina",
       "apellido": "Acosta",
       "dni": "51898050",
       "nroKarting": "66",
       "nroMotor": "Rotax Mini Max #3F8697",
       "tiempo": null,
       "ok": false,
       "posicion": null
      }
     ],
     "150 Varillero": [
      {
       "inscId": "r-f1-14",
       "nombre": "Tomás",
       "apellido": "Molina",
       "dni": "50629637",
       "nroKarting": "26",
       "nroMotor": "Rotax #6G2628",
       "tiempo": 49441,
       "ok": true,
       "posicion": 1
      },
      {
       "inscId": "r-f1-15",
       "nombre": "Agustín",
       "apellido": "Castro",
       "dni": "26346716",
       "nroKarting": "74",
       "nroMotor": "IAME X30 #76596",
       "tiempo": 49659,
       "ok": true,
       "posicion": 2
      },
      {
       "inscId": "r-f1-18",
       "nombre": "Nicolás",
       "apellido": "Ojeda",
       "dni": "41431634",
       "nroKarting": "86",
       "nroMotor": "IAME X30 #49982",
       "tiempo": 49965,
       "ok": true,
       "posicion": 3
      },
      {
       "inscId": "r-f1-24",
       "nombre": "Sofía",
       "apellido": "Cabrera",
       "dni": "51493724",
       "nroKarting": "34",
       "nroMotor": "Rotax #6H2317",
       "tiempo": 50193,
       "ok": true,
       "posicion": 4
      },
      {
       "inscId": "r-f1-22",
       "nombre": "Matías",
       "apellido": "Peralta",
       "dni": "41806213",
       "nroKarting": "30",
       "nroMotor": "Rotax #7E6544",
       "tiempo": 50820,
       "ok": true,
       "posicion": 5
      },
      {
       "inscId": "r-f1-16",
       "nombre": "Camila",
       "apellido": "Rojas",
       "dni": "49889715",
       "nroKarting": "23",
       "nroMotor": "Rotax #5A7765",
       "tiempo": 51268,
       "ok": true,
       "posicion": 6
      },
      {
       "inscId": "r-f1-23",
       "nombre": "Gonzalo",
       "apellido": "Ríos",
       "dni": "24337403",
       "nroKarting": "92",
       "nroMotor": "Rotax #5C6654",
       "tiempo": null,
       "ok": false,
       "posicion": null
      }
     ],
     "125 Internacional": [
      {
       "inscId": "r-f1-30",
       "nombre": "Hernán",
       "apellido": "Maidana",
       "dni": "31222951",
       "nroKarting": "55",
       "nroMotor": "Rotax #7B7879",
       "tiempo": 46498,
       "ok": true,
       "posicion": 1
      },
      {
       "inscId": "r-f1-28",
       "nombre": "Pablo",
       "apellido": "Correa",
       "dni": "43180877",
       "nroKarting": "63",
       "nroMotor": "Rotax #1B3640",
       "tiempo": 46602,
       "ok": true,
       "posicion": 2
      },
      {
       "inscId": "r-f1-32",
       "nombre": "Rodrigo",
       "apellido": "Bustos",
       "dni": "32907799",
       "nroKarting": "16",
       "nroMotor": "Rotax #9C5769",
       "tiempo": 46884,
       "ok": true,
       "posicion": 3
      },
      {
       "inscId": "r-f1-27",
       "nombre": "Leandro",
       "apellido": "Suárez",
       "dni": "42380231",
       "nroKarting": "80",
       "nroMotor": "IAME X30 #27975",
       "tiempo": 47410,
       "ok": true,
       "posicion": 4
      },
      {
       "inscId": "r-f1-29",
       "nombre": "Sebastián",
       "apellido": "Luna",
       "dni": "38562874",
       "nroKarting": "20",
       "nroMotor": "IAME X30 #28642",
       "tiempo": 47670,
       "ok": true,
       "posicion": 5
      },
      {
       "inscId": "r-f1-34",
       "nombre": "Carla",
       "apellido": "Villalba",
       "dni": "35948153",
       "nroKarting": "41",
       "nroMotor": "IAME X30 #81680",
       "tiempo": 47852,
       "ok": true,
       "posicion": 6
      },
      {
       "inscId": "r-f1-26",
       "nombre": "Diego",
       "apellido": "Álvarez",
       "dni": "30018614",
       "nroKarting": "61",
       "nroMotor": "Rotax #3B8140",
       "tiempo": 47954,
       "ok": true,
       "posicion": 7
      },
      {
       "inscId": "r-f1-33",
       "nombre": "Emiliano",
       "apellido": "Ortiz",
       "dni": "40764201",
       "nroKarting": "60",
       "nroMotor": "IAME X30 #84568",
       "tiempo": null,
       "ok": false,
       "posicion": null
      }
     ]
    },
    "2": {
     "110 Escuela": [
      {
       "inscId": "r-f2-13",
       "nombre": "Gustavo",
       "apellido": "Paz",
       "dni": "31602829",
       "nroKarting": "2",
       "nroMotor": "IAME Puma #19539",
       "tiempo": 52825,
       "ok": true,
       "posicion": 1
      },
      {
       "inscId": "r-f2-06",
       "nombre": "Lautaro",
       "apellido": "Benítez",
       "dni": "52301946",
       "nroKarting": "15",
       "nroMotor": "IAME Puma #59784",
       "tiempo": 52866,
       "ok": true,
       "posicion": 2
      },
      {
       "inscId": "r-f2-07",
       "nombre": "Catalina",
       "apellido": "Medina",
       "dni": "50112382",
       "nroKarting": "27",
       "nroMotor": "Rotax Mini Max #3F1335",
       "tiempo": 52980,
       "ok": true,
       "posicion": 3
      },
      {
       "inscId": "r-f2-08",
       "nombre": "Santino",
       "apellido": "Herrera",
       "dni": "52224695",
       "nroKarting": "97",
       "nroMotor": "IAME Puma #33126",
       "tiempo": 53464,
       "ok": true,
       "posicion": 4
      },
      {
       "inscId": "r-f2-04",
       "nombre": "Martina",
       "apellido": "Acosta",
       "dni": "51898050",
       "nroKarting": "66",
       "nroMotor": "Rotax Mini Max #3F8697",
       "tiempo": 53952,
       "ok": true,
       "posicion": 5
      },
      {
       "inscId": "r-f2-03",
       "nombre": "Thiago",
       "apellido": "Giménez",
       "dni": "51386584",
       "nroKarting": "59",
       "nroMotor": "Rotax Mini Max #3D8173",
       "tiempo": 54859,
       "ok": true,
       "posicion": 6
      },
      {
       "inscId": "r-f2-02",
       "nombre": "Valentina",
       "apellido": "Sosa",
       "dni": "52790128",
       "nroKarting": "99",
       "nroMotor": "Rotax Mini Max #7C7705",
       "tiempo": 55247,
       "ok": true,
       "posicion": 7
      },
      {
       "inscId": "r-f2-01",
       "nombre": "Benjamín",
       "apellido": "Ferreyra",
       "dni": "51001346",
       "nroKarting": "18",
       "nroMotor": "Rotax Mini Max #6C5511",
       "tiempo": null,
       "ok": false,
       "posicion": null
      }
     ],
     "150 Varillero": [
      {
       "inscId": "r-f2-20",
       "nombre": "Franco",
       "apellido": "Godoy",
       "dni": "38884151",
       "nroKarting": "57",
       "nroMotor": "Rotax #9G8068",
       "tiempo": 49541,
       "ok": true,
       "posicion": 1
      },
      {
       "inscId": "r-f2-15",
       "nombre": "Agustín",
       "apellido": "Castro",
       "dni": "26346716",
       "nroKarting": "74",
       "nroMotor": "IAME X30 #76596",
       "tiempo": 49893,
       "ok": true,
       "posicion": 2
      },
      {
       "inscId": "r-f2-18",
       "nombre": "Nicolás",
       "apellido": "Ojeda",
       "dni": "41431634",
       "nroKarting": "86",
       "nroMotor": "IAME X30 #49982",
       "tiempo": 50114,
       "ok": true,
       "posicion": 3
      },
      {
       "inscId": "r-f2-21",
       "nombre": "Julieta",
       "apellido": "Navarro",
       "dni": "41851270",
       "nroKarting": "53",
       "nroMotor": "Rotax #7H6278",
       "tiempo": 50228,
       "ok": true,
       "posicion": 4
      },
      {
       "inscId": "r-f2-24",
       "nombre": "Sofía",
       "apellido": "Cabrera",
       "dni": "51493724",
       "nroKarting": "34",
       "nroMotor": "Rotax #6H2317",
       "tiempo": 50481,
       "ok": true,
       "posicion": 5
      },
      {
       "inscId": "r-f2-22",
       "nombre": "Matías",
       "apellido": "Peralta",
       "dni": "41806213",
       "nroKarting": "30",
       "nroMotor": "Rotax #7E6544",
       "tiempo": 50660,
       "ok": true,
       "posicion": 6
      },
      {
       "inscId": "r-f2-16",
       "nombre": "Camila",
       "apellido": "Rojas",
       "dni": "49889715",
       "nroKarting": "23",
       "nroMotor": "Rotax #5A7765",
       "tiempo": 50666,
       "ok": true,
       "posicion": 7
      },
      {
       "inscId": "r-f2-17",
       "nombre": "Facundo",
       "apellido": "Ruiz",
       "dni": "41898799",
       "nroKarting": "52",
       "nroMotor": "IAME X30 #32806",
       "tiempo": 50789,
       "ok": true,
       "posicion": 8
      },
      {
       "inscId": "r-f2-23",
       "nombre": "Gonzalo",
       "apellido": "Ríos",
       "dni": "24337403",
       "nroKarting": "92",
       "nroMotor": "Rotax #5C6654",
       "tiempo": 51435,
       "ok": true,
       "posicion": 9
      }
     ],
     "125 Internacional": [
      {
       "inscId": "r-f2-30",
       "nombre": "Hernán",
       "apellido": "Maidana",
       "dni": "31222951",
       "nroKarting": "55",
       "nroMotor": "Rotax #7B7879",
       "tiempo": 46310,
       "ok": true,
       "posicion": 1
      },
      {
       "inscId": "r-f2-31",
       "nombre": "Federico",
       "apellido": "Vázquez",
       "dni": "23721839",
       "nroKarting": "29",
       "nroMotor": "Rotax #5G8010",
       "tiempo": 46984,
       "ok": true,
       "posicion": 2
      },
      {
       "inscId": "r-f2-27",
       "nombre": "Leandro",
       "apellido": "Suárez",
       "dni": "42380231",
       "nroKarting": "80",
       "nroMotor": "IAME X30 #27975",
       "tiempo": 47630,
       "ok": true,
       "posicion": 3
      },
      {
       "inscId": "r-f2-34",
       "nombre": "Carla",
       "apellido": "Villalba",
       "dni": "35948153",
       "nroKarting": "41",
       "nroMotor": "IAME X30 #81680",
       "tiempo": 47906,
       "ok": true,
       "posicion": 4
      },
      {
       "inscId": "r-f2-33",
       "nombre": "Emiliano",
       "apellido": "Ortiz",
       "dni": "40764201",
       "nroKarting": "60",
       "nroMotor": "IAME X30 #84568",
       "tiempo": 47948,
       "ok": true,
       "posicion": 5
      },
      {
       "inscId": "r-f2-29",
       "nombre": "Sebastián",
       "apellido": "Luna",
       "dni": "38562874",
       "nroKarting": "20",
       "nroMotor": "IAME X30 #28642",
       "tiempo": null,
       "ok": false,
       "posicion": null
      }
     ]
    },
    "3": {
     "110 Escuela": [
      {
       "inscId": "r-f3-07",
       "nombre": "Catalina",
       "apellido": "Medina",
       "dni": "50112382",
       "nroKarting": "27",
       "nroMotor": "Rotax Mini Max #3F1335",
       "tiempo": 52653,
       "ok": true,
       "posicion": 1
      },
      {
       "inscId": "r-f3-08",
       "nombre": "Santino",
       "apellido": "Herrera",
       "dni": "52224695",
       "nroKarting": "97",
       "nroMotor": "IAME Puma #33126",
       "tiempo": 53899,
       "ok": true,
       "posicion": 2
      },
      {
       "inscId": "r-f3-11",
       "nombre": "Felipe",
       "apellido": "Quiroga",
       "dni": "51481714",
       "nroKarting": "21",
       "nroMotor": "Rotax Mini Max #1B1436",
       "tiempo": 54094,
       "ok": true,
       "posicion": 3
      },
      {
       "inscId": "r-f3-10",
       "nombre": "Mía",
       "apellido": "Domínguez",
       "dni": "50451829",
       "nroKarting": "82",
       "nroMotor": "Rotax Mini Max #8F7960",
       "tiempo": 54199,
       "ok": true,
       "posicion": 4
      },
      {
       "inscId": "r-f3-12",
       "nombre": "Lucía",
       "apellido": "Ledesma",
       "dni": "43864626",
       "nroKarting": "33",
       "nroMotor": "Rotax Mini Max #9H3664",
       "tiempo": 54322,
       "ok": true,
       "posicion": 5
      },
      {
       "inscId": "r-f3-03",
       "nombre": "Thiago",
       "apellido": "Giménez",
       "dni": "51386584",
       "nroKarting": "59",
       "nroMotor": "Rotax Mini Max #3D8173",
       "tiempo": 54522,
       "ok": true,
       "posicion": 6
      },
      {
       "inscId": "r-f3-04",
       "nombre": "Martina",
       "apellido": "Acosta",
       "dni": "51898050",
       "nroKarting": "66",
       "nroMotor": "Rotax Mini Max #3F8697",
       "tiempo": null,
       "ok": false,
       "posicion": null
      }
     ],
     "150 Varillero": [
      {
       "inscId": "r-f3-14",
       "nombre": "Tomás",
       "apellido": "Molina",
       "dni": "50629637",
       "nroKarting": "26",
       "nroMotor": "Rotax #6G2628",
       "tiempo": 49470,
       "ok": true,
       "posicion": 1
      },
      {
       "inscId": "r-f3-20",
       "nombre": "Franco",
       "apellido": "Godoy",
       "dni": "38884151",
       "nroKarting": "57",
       "nroMotor": "Rotax #9G8068",
       "tiempo": 49883,
       "ok": true,
       "posicion": 2
      },
      {
       "inscId": "r-f3-18",
       "nombre": "Nicolás",
       "apellido": "Ojeda",
       "dni": "41431634",
       "nroKarting": "86",
       "nroMotor": "IAME X30 #49982",
       "tiempo": 50189,
       "ok": true,
       "posicion": 3
      },
      {
       "inscId": "r-f3-21",
       "nombre": "Julieta",
       "apellido": "Navarro",
       "dni": "41851270",
       "nroKarting": "53",
       "nroMotor": "Rotax #7H6278",
       "tiempo": 50303,
       "ok": true,
       "posicion": 4
      },
      {
       "inscId": "r-f3-24",
       "nombre": "Sofía",
       "apellido": "Cabrera",
       "dni": "51493724",
       "nroKarting": "34",
       "nroMotor": "Rotax #6H2317",
       "tiempo": 50351,
       "ok": true,
       "posicion": 5
      },
      {
       "inscId": "r-f3-22",
       "nombre": "Matías",
       "apellido": "Peralta",
       "dni": "41806213",
       "nroKarting": "30",
       "nroMotor": "Rotax #7E6544",
       "tiempo": 51001,
       "ok": true,
       "posicion": 6
      },
      {
       "inscId": "r-f3-17",
       "nombre": "Facundo",
       "apellido": "Ruiz",
       "dni": "41898799",
       "nroKarting": "52",
       "nroMotor": "IAME X30 #32806",
       "tiempo": 51070,
       "ok": true,
       "posicion": 7
      },
      {
       "inscId": "r-f3-15",
       "nombre": "Agustín",
       "apellido": "Castro",
       "dni": "26346716",
       "nroKarting": "74",
       "nroMotor": "IAME X30 #76596",
       "tiempo": null,
       "ok": false,
       "posicion": null
      }
     ],
     "125 Internacional": [
      {
       "inscId": "r-f3-31",
       "nombre": "Federico",
       "apellido": "Vázquez",
       "dni": "23721839",
       "nroKarting": "29",
       "nroMotor": "Rotax #5G8010",
       "tiempo": 46490,
       "ok": true,
       "posicion": 1
      },
      {
       "inscId": "r-f3-28",
       "nombre": "Pablo",
       "apellido": "Correa",
       "dni": "43180877",
       "nroKarting": "63",
       "nroMotor": "Rotax #1B3640",
       "tiempo": 46551,
       "ok": true,
       "posicion": 2
      },
      {
       "inscId": "r-f3-29",
       "nombre": "Sebastián",
       "apellido": "Luna",
       "dni": "38562874",
       "nroKarting": "20",
       "nroMotor": "IAME X30 #28642",
       "tiempo": 47252,
       "ok": true,
       "posicion": 3
      },
      {
       "inscId": "r-f3-27",
       "nombre": "Leandro",
       "apellido": "Suárez",
       "dni": "42380231",
       "nroKarting": "80",
       "nroMotor": "IAME X30 #27975",
       "tiempo": 47505,
       "ok": true,
       "posicion": 4
      },
      {
       "inscId": "r-f3-34",
       "nombre": "Carla",
       "apellido": "Villalba",
       "dni": "35948153",
       "nroKarting": "41",
       "nroMotor": "IAME X30 #81680",
       "tiempo": 47925,
       "ok": true,
       "posicion": 5
      },
      {
       "inscId": "r-f3-33",
       "nombre": "Emiliano",
       "apellido": "Ortiz",
       "dni": "40764201",
       "nroKarting": "60",
       "nroMotor": "IAME X30 #84568",
       "tiempo": 47949,
       "ok": true,
       "posicion": 6
      },
      {
       "inscId": "r-f3-35",
       "nombre": "Ezequiel",
       "apellido": "Moreno",
       "dni": "39613689",
       "nroKarting": "96",
       "nroMotor": "Rotax #3D9647",
       "tiempo": 48044,
       "ok": true,
       "posicion": 7
      },
      {
       "inscId": "r-f3-25",
       "nombre": "Martín",
       "apellido": "Fernández",
       "dni": "24683485",
       "nroKarting": "98",
       "nroMotor": "IAME X30 #43894",
       "tiempo": 48571,
       "ok": true,
       "posicion": 8
      },
      {
       "inscId": "r-f3-30",
       "nombre": "Hernán",
       "apellido": "Maidana",
       "dni": "31222951",
       "nroKarting": "55",
       "nroMotor": "Rotax #7B7879",
       "tiempo": null,
       "ok": false,
       "posicion": null
      }
     ]
    }
   },
   "ejemplo": true
  },
  {
   "id": "t-2026-f4",
   "nombre": "RGK Santafesino 2026 — Torneo Clausura",
   "fecha": "2026-10-18",
   "lugar": "Kartódromo de Cañada de Gómez",
   "estado": "actual",
   "categorias": [
    {
     "nombre": "110 Escuela",
     "cupo": 12
    },
    {
     "nombre": "150 Varillero",
     "cupo": 10
    },
    {
     "nombre": "125 Internacional",
     "cupo": 8
    }
   ],
   "notas": "Acreditación desde las 8:00. Briefing de pilotos 9:30. Largada 110 Escuela 10:00.",
   "creado": "2026-10-05T13:00:00.000Z",
   "ejemplo": true,
   "fechas": [
    "2026-10-18",
    "2026-10-25",
    "2026-11-08"
   ]
  },
  {
   "id": "t-2026-f5",
   "nombre": "RGK Santafesino 2026 — Gran Premio Ciudad",
   "fecha": "2026-11-15",
   "lugar": "Kartódromo de Rafaela",
   "estado": "proximo",
   "categorias": [
    {
     "nombre": "110 Escuela",
     "cupo": 12
    },
    {
     "nombre": "150 Varillero",
     "cupo": 10
    },
    {
     "nombre": "125 Internacional",
     "cupo": 8
    }
   ],
   "notas": "",
   "creado": "2026-10-06T15:20:00.000Z",
   "ejemplo": true,
   "fechas": [
    "2026-11-15",
    "2026-11-22"
   ]
  },
  {
   "id": "t-2026-f6",
   "nombre": "RGK Santafesino 2026 — Copa de Fin de Año",
   "fecha": "2026-11-29",
   "fechas": [
    "2026-11-29",
    "2026-12-06",
    "2026-12-13",
    "2026-12-20"
   ],
   "lugar": "Kartódromo de Cañada de Gómez",
   "estado": "proximo",
   "categorias": [
    {
     "nombre": "110 Escuela",
     "cupo": 14
    },
    {
     "nombre": "150 Varillero",
     "cupo": 12
    },
    {
     "nombre": "125 Internacional",
     "cupo": 10
    }
   ],
   "notas": "Entrega de premios del campeonato al finalizar.",
   "creado": "2026-10-06T15:25:00.000Z",
   "ejemplo": true
  }
 ],
 "inscripciones": [
  {
   "id": "i-001",
   "torneoId": "t-2026-f4",
   "categoria": "150 Varillero",
   "nombre": "Nicolás",
   "apellido": "Ojeda",
   "dni": "41431634",
   "direccion": "Colón 4454, Lanús",
   "telefono": "+54 9 11 3896-4735",
   "email": "nicolas.ojeda@ejemplo.com",
   "seguro": "San Cristóbal",
   "nroMotor": "IAME X30 #49982",
   "nroKarting": "86",
   "autorizacion": {
    "assetId": "ejemplo-autorizacion",
    "nombre": "autorizacion_padres.jpg",
    "tipo": "image/jpeg",
    "tamano": 834221
   },
   "creado": "2026-10-05T22:23:07.000Z",
   "actualizado": "2026-10-05T22:23:07.000Z",
   "ejemplo": true
  },
  {
   "id": "i-002",
   "torneoId": "t-2026-f4",
   "categoria": "110 Escuela",
   "nombre": "Valentina",
   "apellido": "Sosa",
   "dni": "52790128",
   "direccion": "Tucumán 4227, Castelar",
   "telefono": "+54 9 11 4718-7119",
   "email": "valentina.sosa@ejemplo.com",
   "seguro": "San Cristóbal",
   "nroMotor": "Rotax Mini Max #7C7705",
   "nroKarting": "99",
   "autorizacion": {
    "assetId": "ejemplo-autorizacion",
    "nombre": "autorizacion_padres.jpg",
    "tipo": "image/jpeg",
    "tamano": 834221
   },
   "creado": "2026-10-05T12:59:33.000Z",
   "actualizado": "2026-10-05T12:59:33.000Z",
   "ejemplo": true
  },
  {
   "id": "i-003",
   "torneoId": "t-2026-f4",
   "categoria": "110 Escuela",
   "nombre": "Martina",
   "apellido": "Acosta",
   "dni": "51898050",
   "direccion": "Las Heras 3547, Hurlingham",
   "telefono": "+54 9 11 3487-3006",
   "email": "martina.acosta@ejemplo.com",
   "seguro": "Sancor Seguros",
   "nroMotor": "Rotax Mini Max #3F8697",
   "nroKarting": "66",
   "autorizacion": null,
   "creado": "2026-10-06T13:12:24.000Z",
   "actualizado": "2026-10-06T13:12:24.000Z",
   "ejemplo": true
  },
  {
   "id": "i-004",
   "torneoId": "t-2026-f4",
   "categoria": "150 Varillero",
   "nombre": "Gonzalo",
   "apellido": "Ríos",
   "dni": "24337403",
   "direccion": "San Martín 1233, Campana",
   "telefono": "+54 9 11 6676-6561",
   "email": "gonzalo.rios@ejemplo.com",
   "seguro": "Federación Patronal",
   "nroMotor": "Rotax #5C6654",
   "nroKarting": "92",
   "autorizacion": {
    "assetId": "ejemplo-autorizacion",
    "nombre": "autorizacion_padres.jpg",
    "tipo": "image/jpeg",
    "tamano": 834221
   },
   "creado": "2026-10-06T19:58:18.000Z",
   "actualizado": "2026-10-06T19:58:18.000Z",
   "ejemplo": true
  },
  {
   "id": "i-005",
   "torneoId": "t-2026-f4",
   "categoria": "110 Escuela",
   "nombre": "Gustavo",
   "apellido": "Paz",
   "dni": "31602829",
   "direccion": "Laprida 3468, Morón",
   "telefono": "+54 9 11 4056-2448",
   "email": "gustavo.paz@ejemplo.com",
   "seguro": "Federación Patronal",
   "nroMotor": "IAME Puma #19539",
   "nroKarting": "2",
   "autorizacion": {
    "assetId": "ejemplo-autorizacion",
    "nombre": "autorizacion_padres.jpg",
    "tipo": "image/jpeg",
    "tamano": 834221
   },
   "creado": "2026-10-07T09:35:53.000Z",
   "actualizado": "2026-10-07T09:35:53.000Z",
   "ejemplo": true
  },
  {
   "id": "i-006",
   "torneoId": "t-2026-f4",
   "categoria": "150 Varillero",
   "nombre": "Franco",
   "apellido": "Godoy",
   "dni": "38884151",
   "direccion": "Las Heras 941, San Justo",
   "telefono": "+54 9 11 4105-1800",
   "email": "franco.godoy@ejemplo.com",
   "seguro": "San Cristóbal",
   "nroMotor": "Rotax #9G8068",
   "nroKarting": "57",
   "autorizacion": null,
   "creado": "2026-10-07T16:17:37.000Z",
   "actualizado": "2026-10-07T16:17:37.000Z",
   "ejemplo": true
  },
  {
   "id": "i-007",
   "torneoId": "t-2026-f4",
   "categoria": "110 Escuela",
   "nombre": "Lautaro",
   "apellido": "Benítez",
   "dni": "52301946",
   "direccion": "Alsina 1047, Quilmes",
   "telefono": "+54 9 11 4065-5978",
   "email": "lautaro.benitez@ejemplo.com",
   "seguro": "Rivadavia Seguros",
   "nroMotor": "IAME Puma #59784",
   "nroKarting": "15",
   "autorizacion": {
    "assetId": "ejemplo-autorizacion",
    "nombre": "autorizacion_padres.jpg",
    "tipo": "image/jpeg",
    "tamano": 834221
   },
   "creado": "2026-10-08T09:01:45.000Z",
   "actualizado": "2026-10-08T09:01:45.000Z",
   "ejemplo": true
  },
  {
   "id": "i-008",
   "torneoId": "t-2026-f4",
   "categoria": "150 Varillero",
   "nombre": "Matías",
   "apellido": "Peralta",
   "dni": "41806213",
   "direccion": "Av. Calchaquí 3054, Pilar",
   "telefono": "+54 9 11 2625-4489",
   "email": "matias.peralta@ejemplo.com",
   "seguro": "Sancor Seguros",
   "nroMotor": "Rotax #7E6544",
   "nroKarting": "30",
   "autorizacion": {
    "assetId": "ejemplo-autorizacion",
    "nombre": "autorizacion_padres.jpg",
    "tipo": "image/jpeg",
    "tamano": 834221
   },
   "creado": "2026-10-08T10:20:33.000Z",
   "actualizado": "2026-10-08T10:20:33.000Z",
   "ejemplo": true
  },
  {
   "id": "i-009",
   "torneoId": "t-2026-f4",
   "categoria": "125 Internacional",
   "nombre": "Sebastián",
   "apellido": "Luna",
   "dni": "38562874",
   "direccion": "Moreno 1837, San Justo",
   "telefono": "+54 9 11 2924-4387",
   "email": "sebastian.luna@ejemplo.com",
   "seguro": "Sancor Seguros",
   "nroMotor": "IAME X30 #28642",
   "nroKarting": "20",
   "autorizacion": null,
   "creado": "2026-10-09T11:46:30.000Z",
   "actualizado": "2026-10-09T11:46:30.000Z",
   "ejemplo": true
  },
  {
   "id": "i-010",
   "torneoId": "t-2026-f4",
   "categoria": "125 Internacional",
   "nombre": "Carla",
   "apellido": "Villalba",
   "dni": "35948153",
   "direccion": "Brown 2735, Pilar",
   "telefono": "+54 9 11 5218-7354",
   "email": "carla.villalba@ejemplo.com",
   "seguro": "Sancor Seguros",
   "nroMotor": "IAME X30 #81680",
   "nroKarting": "41",
   "autorizacion": {
    "assetId": "ejemplo-autorizacion",
    "nombre": "autorizacion_padres.jpg",
    "tipo": "image/jpeg",
    "tamano": 834221
   },
   "creado": "2026-10-09T18:53:19.000Z",
   "actualizado": "2026-10-09T18:53:19.000Z",
   "ejemplo": true
  },
  {
   "id": "i-011",
   "torneoId": "t-2026-f4",
   "categoria": "110 Escuela",
   "nombre": "Felipe",
   "apellido": "Quiroga",
   "dni": "51481714",
   "direccion": "Güemes 2748, Banfield",
   "telefono": "+54 9 11 4443-4241",
   "email": "felipe.quiroga@ejemplo.com",
   "seguro": "San Cristóbal",
   "nroMotor": "Rotax Mini Max #1B1436",
   "nroKarting": "21",
   "autorizacion": {
    "assetId": "ejemplo-autorizacion",
    "nombre": "autorizacion_padres.jpg",
    "tipo": "image/jpeg",
    "tamano": 834221
   },
   "creado": "2026-10-10T13:37:24.000Z",
   "actualizado": "2026-10-10T13:37:24.000Z",
   "ejemplo": true
  },
  {
   "id": "i-012",
   "torneoId": "t-2026-f4",
   "categoria": "125 Internacional",
   "nombre": "Rodrigo",
   "apellido": "Bustos",
   "dni": "32907799",
   "direccion": "Brown 1123, San Isidro",
   "telefono": "+54 9 11 4009-4395",
   "email": "rodrigo.bustos@ejemplo.com",
   "seguro": "San Cristóbal",
   "nroMotor": "Rotax #9C5769",
   "nroKarting": "16",
   "autorizacion": null,
   "creado": "2026-10-10T21:04:14.000Z",
   "actualizado": "2026-10-10T21:04:14.000Z",
   "ejemplo": true
  },
  {
   "id": "i-013",
   "torneoId": "t-2026-f4",
   "categoria": "150 Varillero",
   "nombre": "Sofía",
   "apellido": "Cabrera",
   "dni": "51493724",
   "direccion": "San Martín 3214, San Fernando",
   "telefono": "+54 9 11 4176-7882",
   "email": "sofia.cabrera@ejemplo.com",
   "seguro": "La Segunda",
   "nroMotor": "Rotax #6H2317",
   "nroKarting": "34",
   "autorizacion": {
    "assetId": "ejemplo-autorizacion",
    "nombre": "autorizacion_padres.jpg",
    "tipo": "image/jpeg",
    "tamano": 834221
   },
   "creado": "2026-10-11T14:18:34.000Z",
   "actualizado": "2026-10-11T14:18:34.000Z",
   "ejemplo": true
  },
  {
   "id": "i-014",
   "torneoId": "t-2026-f4",
   "categoria": "150 Varillero",
   "nombre": "Agustín",
   "apellido": "Castro",
   "dni": "26346716",
   "direccion": "Las Heras 4080, Escobar",
   "telefono": "+54 9 11 2169-8930",
   "email": "agustin.castro@ejemplo.com",
   "seguro": "La Segunda",
   "nroMotor": "IAME X30 #76596",
   "nroKarting": "74",
   "autorizacion": {
    "assetId": "ejemplo-autorizacion",
    "nombre": "autorizacion_padres.jpg",
    "tipo": "image/jpeg",
    "tamano": 834221
   },
   "creado": "2026-10-11T22:39:01.000Z",
   "actualizado": "2026-10-11T22:39:01.000Z",
   "ejemplo": true
  },
  {
   "id": "i-015",
   "torneoId": "t-2026-f4",
   "categoria": "110 Escuela",
   "nombre": "Bautista",
   "apellido": "Romero",
   "dni": "52317474",
   "direccion": "Laprida 716, San Fernando",
   "telefono": "+54 9 11 4942-0957",
   "email": "bautista.romero@ejemplo.com",
   "seguro": "La Segunda",
   "nroMotor": "IAME Puma #25849",
   "nroKarting": "4",
   "autorizacion": null,
   "creado": "2026-10-12T18:35:40.000Z",
   "actualizado": "2026-10-12T18:35:40.000Z",
   "ejemplo": true
  },
  {
   "id": "i-016",
   "torneoId": "t-2026-f4",
   "categoria": "110 Escuela",
   "nombre": "Santino",
   "apellido": "Herrera",
   "dni": "52224695",
   "direccion": "Sarmiento 2645, Lomas de Zamora",
   "telefono": "+54 9 11 3746-8338",
   "email": "santino.herrera@ejemplo.com",
   "seguro": "Federación Patronal",
   "nroMotor": "IAME Puma #33126",
   "nroKarting": "97",
   "autorizacion": {
    "assetId": "ejemplo-autorizacion",
    "nombre": "autorizacion_padres.jpg",
    "tipo": "image/jpeg",
    "tamano": 834221
   },
   "creado": "2026-10-12T16:48:21.000Z",
   "actualizado": "2026-10-12T16:48:21.000Z",
   "ejemplo": true
  },
  {
   "id": "i-017",
   "torneoId": "t-2026-f4",
   "categoria": "110 Escuela",
   "nombre": "Catalina",
   "apellido": "Medina",
   "dni": "50112382",
   "direccion": "Av. Calchaquí 1345, Hurlingham",
   "telefono": "+54 9 11 5630-1637",
   "email": "catalina.medina@ejemplo.com",
   "seguro": "Sancor Seguros",
   "nroMotor": "Rotax Mini Max #3F1335",
   "nroKarting": "27",
   "autorizacion": {
    "assetId": "ejemplo-autorizacion",
    "nombre": "autorizacion_padres.jpg",
    "tipo": "image/jpeg",
    "tamano": 834221
   },
   "creado": "2026-10-13T11:00:01.000Z",
   "actualizado": "2026-10-13T11:00:01.000Z",
   "ejemplo": true
  },
  {
   "id": "i-018",
   "torneoId": "t-2026-f4",
   "categoria": "150 Varillero",
   "nombre": "Camila",
   "apellido": "Rojas",
   "dni": "49889715",
   "direccion": "Sarmiento 4203, Lomas de Zamora",
   "telefono": "+54 9 11 3515-0227",
   "email": "camila.rojas@ejemplo.com",
   "seguro": "Federación Patronal",
   "nroMotor": "Rotax #5A7765",
   "nroKarting": "23",
   "autorizacion": null,
   "creado": "2026-10-13T10:32:54.000Z",
   "actualizado": "2026-10-13T10:32:54.000Z",
   "ejemplo": true
  },
  {
   "id": "i-019",
   "torneoId": "t-2026-f4",
   "categoria": "150 Varillero",
   "nombre": "Facundo",
   "apellido": "Ruiz",
   "dni": "41898799",
   "direccion": "Italia 2615, San Justo",
   "telefono": "+54 9 11 5902-7198",
   "email": "facundo.ruiz@ejemplo.com",
   "seguro": "Rivadavia Seguros",
   "nroMotor": "IAME X30 #32806",
   "nroKarting": "52",
   "autorizacion": {
    "assetId": "ejemplo-autorizacion",
    "nombre": "autorizacion_padres.jpg",
    "tipo": "image/jpeg",
    "tamano": 834221
   },
   "creado": "2026-10-14T21:10:16.000Z",
   "actualizado": "2026-10-14T21:10:16.000Z",
   "ejemplo": true
  },
  {
   "id": "i-020",
   "torneoId": "t-2026-f4",
   "categoria": "125 Internacional",
   "nombre": "Ezequiel",
   "apellido": "Moreno",
   "dni": "39613689",
   "direccion": "Belgrano 4222, Banfield",
   "telefono": "+54 9 11 2579-2183",
   "email": "ezequiel.moreno@ejemplo.com",
   "seguro": "Rivadavia Seguros",
   "nroMotor": "Rotax #3D9647",
   "nroKarting": "96",
   "autorizacion": {
    "assetId": "ejemplo-autorizacion",
    "nombre": "autorizacion_padres.jpg",
    "tipo": "image/jpeg",
    "tamano": 834221
   },
   "creado": "2026-10-14T14:36:33.000Z",
   "actualizado": "2026-10-14T14:36:33.000Z",
   "ejemplo": true,
   "invitado": true,
   "grupo": "i-020"
  },
  {
   "id": "i-021",
   "torneoId": "t-2026-f4",
   "categoria": "125 Internacional",
   "nombre": "Pablo",
   "apellido": "Correa",
   "dni": "43180877",
   "direccion": "Italia 1438, Ramos Mejía",
   "telefono": "+54 9 11 2579-2183",
   "email": "pablo.correa@ejemplo.com",
   "seguro": "Rivadavia Seguros",
   "nroMotor": "Rotax #3D9647",
   "nroKarting": "96",
   "autorizacion": null,
   "creado": "2026-10-15T12:49:48.000Z",
   "actualizado": "2026-10-15T12:49:48.000Z",
   "ejemplo": true,
   "invitado": true,
   "grupo": "i-020"
  },
  {
   "id": "i-022",
   "torneoId": "t-2026-f4",
   "categoria": "110 Escuela",
   "nombre": "Thiago",
   "apellido": "Giménez",
   "dni": "51386584",
   "direccion": "Pueyrredón 4206, Banfield",
   "telefono": "+54 9 11 3755-5403",
   "email": "thiago.gimenez@ejemplo.com",
   "seguro": "San Cristóbal",
   "nroMotor": "Rotax Mini Max #3D8173",
   "nroKarting": "59",
   "autorizacion": {
    "assetId": "ejemplo-autorizacion",
    "nombre": "autorizacion_padres.jpg",
    "tipo": "image/jpeg",
    "tamano": 834221
   },
   "creado": "2026-10-15T21:41:47.000Z",
   "actualizado": "2026-10-15T21:41:47.000Z",
   "ejemplo": true
  },
  {
   "id": "i-023",
   "torneoId": "t-2026-f5",
   "categoria": "110 Escuela",
   "nombre": "Benjamín",
   "apellido": "Ferreyra",
   "dni": "51001346",
   "direccion": "Av. Mitre 2104, Quilmes",
   "telefono": "+54 9 11 2153-4243",
   "email": "benjamin.ferreyra@ejemplo.com",
   "seguro": "Rivadavia Seguros",
   "nroMotor": "Rotax Mini Max #6C5511",
   "nroKarting": "18",
   "autorizacion": {
    "assetId": "ejemplo-autorizacion",
    "nombre": "autorizacion_padres.jpg",
    "tipo": "image/jpeg",
    "tamano": 834221
   },
   "creado": "2026-10-12T16:08:03.000Z",
   "actualizado": "2026-10-12T16:08:03.000Z",
   "ejemplo": true
  },
  {
   "id": "i-024",
   "torneoId": "t-2026-f5",
   "categoria": "125 Internacional",
   "nombre": "Martín",
   "apellido": "Fernández",
   "dni": "24683485",
   "direccion": "Lavalle 4785, Castelar",
   "telefono": "+54 9 11 2160-2484",
   "email": "martin.fernandez@ejemplo.com",
   "seguro": "San Cristóbal",
   "nroMotor": "IAME X30 #43894",
   "nroKarting": "98",
   "autorizacion": null,
   "creado": "2026-10-14T10:38:39.000Z",
   "actualizado": "2026-10-14T10:38:39.000Z",
   "ejemplo": true
  },
  {
   "id": "i-025",
   "torneoId": "t-2026-f5",
   "categoria": "150 Varillero",
   "nombre": "Camila",
   "apellido": "Rojas",
   "dni": "49889715",
   "direccion": "Sarmiento 4203, Lomas de Zamora",
   "telefono": "+54 9 11 3515-0227",
   "email": "camila.rojas@ejemplo.com",
   "seguro": "Federación Patronal",
   "nroMotor": "Rotax #5A7765",
   "nroKarting": "23",
   "autorizacion": {
    "assetId": "ejemplo-autorizacion",
    "nombre": "autorizacion_padres.jpg",
    "tipo": "image/jpeg",
    "tamano": 834221
   },
   "creado": "2026-10-16T10:45:40.000Z",
   "actualizado": "2026-10-16T10:45:40.000Z",
   "ejemplo": true
  }
 ],
 "tiempos": {
  "t-2026-f4": {
   "i-001": {
    "tiempo": 51378,
    "ok": true,
    "f2": {
     "tiempo": 51478,
     "ok": false
    }
   },
   "i-002": {
    "tiempo": 54878,
    "ok": true,
    "f2": {
     "tiempo": 55077,
     "ok": true
    }
   },
   "i-003": {
    "tiempo": 53147,
    "ok": true,
    "f2": {
     "tiempo": 53283,
     "ok": true
    }
   },
   "i-004": {
    "tiempo": 50507,
    "ok": true,
    "f2": {
     "tiempo": 50436,
     "ok": true
    }
   },
   "i-005": {
    "tiempo": 53283,
    "ok": true,
    "f2": {
     "tiempo": 53300,
     "ok": true
    }
   },
   "i-006": {
    "tiempo": 49766,
    "ok": true,
    "f2": {
     "tiempo": 49495,
     "ok": true
    }
   },
   "i-007": {
    "tiempo": 54832,
    "ok": true,
    "f2": {
     "tiempo": 54756,
     "ok": false
    }
   },
   "i-008": {
    "tiempo": 51290,
    "ok": true,
    "f2": {
     "tiempo": 51626,
     "ok": true
    }
   },
   "i-009": {
    "tiempo": 48486,
    "ok": true,
    "f2": {
     "tiempo": 48274,
     "ok": true
    }
   },
   "i-010": {
    "tiempo": 48980,
    "ok": true,
    "f2": {
     "tiempo": 49194,
     "ok": false
    }
   },
   "i-011": {
    "tiempo": 54464,
    "ok": true,
    "f2": {
     "tiempo": 54038,
     "ok": true
    }
   },
   "i-012": {
    "tiempo": 47396,
    "ok": true,
    "f2": {
     "tiempo": 47209,
     "ok": true
    }
   },
   "i-013": {
    "tiempo": 50469,
    "ok": true,
    "f2": {
     "tiempo": 50551,
     "ok": true
    }
   },
   "i-014": {
    "tiempo": 49865,
    "ok": true,
    "f2": {
     "tiempo": 49451,
     "ok": true
    }
   },
   "i-015": {
    "tiempo": 54904,
    "ok": true,
    "f2": {
     "tiempo": 54743,
     "ok": true
    }
   },
   "i-016": {
    "tiempo": 53278,
    "ok": true,
    "f2": {
     "tiempo": 53682,
     "ok": false
    }
   },
   "i-017": {
    "tiempo": 53132,
    "ok": true,
    "f2": {
     "tiempo": null,
     "ok": false
    }
   },
   "i-018": {
    "tiempo": 51030,
    "ok": true,
    "f2": {
     "tiempo": 51378,
     "ok": false
    }
   },
   "i-019": {
    "tiempo": 50902,
    "ok": true,
    "f2": {
     "tiempo": 50990,
     "ok": true
    }
   },
   "i-020": {
    "tiempo": 47993,
    "ok": true,
    "f2": {
     "tiempo": null,
     "ok": false
    }
   },
   "i-021": {
    "tiempo": 46801,
    "ok": true,
    "f2": {
     "tiempo": 46607,
     "ok": true
    }
   },
   "i-022": {
    "tiempo": 54667,
    "ok": true,
    "f2": {
     "tiempo": 54683,
     "ok": true
    }
   }
  }
 }
};
