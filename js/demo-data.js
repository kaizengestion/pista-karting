/* Datos de ejemplo (todos con ejemplo: true). Generados para una "hoy" = 2026-10-28. Categorías y lugares del RGK Santafesino. Inscripciones con el formulario del cliente
   (categorías múltiples, licencias opcionales, emergencia; sin cupos). Resultados por puntos: planillas por fecha y categoría en `puntos`.
   Cada torneo tiene de 1 a 10 fechas (`fechas`); los finalizados guardan una planilla por fecha en `resultadosFechas`
   (`resultados` = fecha 1, para compatibilidad).
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
     "cupo": null
    },
    {
     "nombre": "150 Varillero",
     "cupo": null
    },
    {
     "nombre": "125 Internacional",
     "cupo": null
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
      "posicion": 1,
      "puntos": 25
     },
     {
      "inscId": "r-ver-f1-1346",
      "nombre": "Benjamín",
      "apellido": "Ferreyra",
      "dni": "51001346",
      "nroKarting": "18",
      "posicion": 2,
      "puntos": 20
     },
     {
      "inscId": "r-ver-f1-6302",
      "nombre": "Joaquín",
      "apellido": "Aguirre",
      "dni": "50016302",
      "nroKarting": "58",
      "posicion": 3,
      "puntos": 16
     },
     {
      "inscId": "r-ver-f1-1946",
      "nombre": "Lautaro",
      "apellido": "Benítez",
      "dni": "52301946",
      "nroKarting": "15",
      "posicion": 4,
      "puntos": 13
     }
    ],
    "150 Varillero": [
     {
      "inscId": "r-ver-f1-9715",
      "nombre": "Camila",
      "apellido": "Rojas",
      "dni": "49889715",
      "nroKarting": "23",
      "posicion": 1,
      "puntos": 25
     },
     {
      "inscId": "r-ver-f1-4151",
      "nombre": "Franco",
      "apellido": "Godoy",
      "dni": "38884151",
      "nroKarting": "57",
      "posicion": 2,
      "puntos": 20
     },
     {
      "inscId": "r-ver-f1-1634",
      "nombre": "Nicolás",
      "apellido": "Ojeda",
      "dni": "41431634",
      "nroKarting": "86",
      "posicion": 3,
      "puntos": 16
     },
     {
      "inscId": "r-ver-f1-7403",
      "nombre": "Gonzalo",
      "apellido": "Ríos",
      "dni": "24337403",
      "nroKarting": "92",
      "posicion": 4,
      "puntos": 13
     },
     {
      "inscId": "r-ver-f1-8799",
      "nombre": "Facundo",
      "apellido": "Ruiz",
      "dni": "41898799",
      "nroKarting": "52",
      "posicion": 5,
      "puntos": 11
     }
    ],
    "125 Internacional": [
     {
      "inscId": "r-ver-f1-1839",
      "nombre": "Federico",
      "apellido": "Vázquez",
      "dni": "23721839",
      "nroKarting": "29",
      "posicion": 1,
      "puntos": 25
     },
     {
      "inscId": "r-ver-f1-3485",
      "nombre": "Martín",
      "apellido": "Fernández",
      "dni": "24683485",
      "nroKarting": "98",
      "posicion": 2,
      "puntos": 20
     },
     {
      "inscId": "r-ver-f1-0877",
      "nombre": "Pablo",
      "apellido": "Correa",
      "dni": "43180877",
      "nroKarting": "63",
      "posicion": 3,
      "puntos": 16
     },
     {
      "inscId": "r-ver-f1-7799",
      "nombre": "Rodrigo",
      "apellido": "Bustos",
      "dni": "32907799",
      "nroKarting": "16",
      "posicion": 4,
      "puntos": 13
     },
     {
      "inscId": "r-ver-f1-8614",
      "nombre": "Diego",
      "apellido": "Álvarez",
      "dni": "30018614",
      "nroKarting": "61",
      "posicion": 5,
      "puntos": 11
     },
     {
      "inscId": "r-ver-f1-2951",
      "nombre": "Hernán",
      "apellido": "Maidana",
      "dni": "31222951",
      "nroKarting": "55",
      "posicion": 6,
      "puntos": 10
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
     "cupo": null
    },
    {
     "nombre": "150 Varillero",
     "cupo": null
    },
    {
     "nombre": "125 Internacional",
     "cupo": null
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
       "posicion": 1,
       "puntos": 25
      },
      {
       "inscId": "r-inv-f1-4626",
       "nombre": "Lucía",
       "apellido": "Ledesma",
       "dni": "43864626",
       "nroKarting": "33",
       "posicion": 2,
       "puntos": 20
      },
      {
       "inscId": "r-inv-f1-0128",
       "nombre": "Valentina",
       "apellido": "Sosa",
       "dni": "52790128",
       "nroKarting": "99",
       "posicion": 3,
       "puntos": 16
      },
      {
       "inscId": "r-inv-f1-8050",
       "nombre": "Martina",
       "apellido": "Acosta",
       "dni": "51898050",
       "nroKarting": "66",
       "posicion": 4,
       "puntos": 13
      },
      {
       "inscId": "r-inv-f1-1829",
       "nombre": "Mía",
       "apellido": "Domínguez",
       "dni": "50451829",
       "nroKarting": "82",
       "posicion": 5,
       "puntos": 11
      },
      {
       "inscId": "r-inv-f1-6302",
       "nombre": "Joaquín",
       "apellido": "Aguirre",
       "dni": "50016302",
       "nroKarting": "58",
       "posicion": 6,
       "puntos": 10
      }
     ],
     "150 Varillero": [
      {
       "inscId": "r-inv-f1-4151",
       "nombre": "Franco",
       "apellido": "Godoy",
       "dni": "38884151",
       "nroKarting": "57",
       "posicion": 1,
       "puntos": 25
      },
      {
       "inscId": "r-inv-f1-7403",
       "nombre": "Gonzalo",
       "apellido": "Ríos",
       "dni": "24337403",
       "nroKarting": "92",
       "posicion": 2,
       "puntos": 20
      },
      {
       "inscId": "r-inv-f1-6716",
       "nombre": "Agustín",
       "apellido": "Castro",
       "dni": "26346716",
       "nroKarting": "74",
       "posicion": 3,
       "puntos": 16
      },
      {
       "inscId": "r-inv-f1-6213",
       "nombre": "Matías",
       "apellido": "Peralta",
       "dni": "41806213",
       "nroKarting": "30",
       "posicion": 4,
       "puntos": 13
      },
      {
       "inscId": "r-inv-f1-3724",
       "nombre": "Sofía",
       "apellido": "Cabrera",
       "dni": "51493724",
       "nroKarting": "34",
       "posicion": 5,
       "puntos": 11
      },
      {
       "inscId": "r-inv-f1-1634",
       "nombre": "Nicolás",
       "apellido": "Ojeda",
       "dni": "41431634",
       "nroKarting": "86",
       "posicion": 6,
       "puntos": 10
      },
      {
       "inscId": "r-inv-f1-8799",
       "nombre": "Facundo",
       "apellido": "Ruiz",
       "dni": "41898799",
       "nroKarting": "52",
       "posicion": 7,
       "puntos": 9
      }
     ],
     "125 Internacional": [
      {
       "inscId": "r-inv-f1-2874",
       "nombre": "Sebastián",
       "apellido": "Luna",
       "dni": "38562874",
       "nroKarting": "20",
       "posicion": 1,
       "puntos": 25
      },
      {
       "inscId": "r-inv-f1-0231",
       "nombre": "Leandro",
       "apellido": "Suárez",
       "dni": "42380231",
       "nroKarting": "80",
       "posicion": 2,
       "puntos": 20
      },
      {
       "inscId": "r-inv-f1-1839",
       "nombre": "Federico",
       "apellido": "Vázquez",
       "dni": "23721839",
       "nroKarting": "29",
       "posicion": 3,
       "puntos": 16
      },
      {
       "inscId": "r-inv-f1-0877",
       "nombre": "Pablo",
       "apellido": "Correa",
       "dni": "43180877",
       "nroKarting": "63",
       "posicion": 4,
       "puntos": 13
      },
      {
       "inscId": "r-inv-f1-2951",
       "nombre": "Hernán",
       "apellido": "Maidana",
       "dni": "31222951",
       "nroKarting": "55",
       "posicion": 5,
       "puntos": 11
      },
      {
       "inscId": "r-inv-f1-3485",
       "nombre": "Martín",
       "apellido": "Fernández",
       "dni": "24683485",
       "nroKarting": "98",
       "posicion": 6,
       "puntos": 10
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
       "posicion": 1,
       "puntos": 25
      },
      {
       "inscId": "r-inv-f2-1946",
       "nombre": "Lautaro",
       "apellido": "Benítez",
       "dni": "52301946",
       "nroKarting": "15",
       "posicion": 2,
       "puntos": 20
      },
      {
       "inscId": "r-inv-f2-2382",
       "nombre": "Catalina",
       "apellido": "Medina",
       "dni": "50112382",
       "nroKarting": "27",
       "posicion": 3,
       "puntos": 16
      },
      {
       "inscId": "r-inv-f2-8050",
       "nombre": "Martina",
       "apellido": "Acosta",
       "dni": "51898050",
       "nroKarting": "66",
       "posicion": 4,
       "puntos": 13
      },
      {
       "inscId": "r-inv-f2-0128",
       "nombre": "Valentina",
       "apellido": "Sosa",
       "dni": "52790128",
       "nroKarting": "99",
       "posicion": 5,
       "puntos": 11
      },
      {
       "inscId": "r-inv-f2-4626",
       "nombre": "Lucía",
       "apellido": "Ledesma",
       "dni": "43864626",
       "nroKarting": "33",
       "posicion": 6,
       "puntos": 10
      }
     ],
     "150 Varillero": [
      {
       "inscId": "r-inv-f2-6213",
       "nombre": "Matías",
       "apellido": "Peralta",
       "dni": "41806213",
       "nroKarting": "30",
       "posicion": 1,
       "puntos": 25
      },
      {
       "inscId": "r-inv-f2-6716",
       "nombre": "Agustín",
       "apellido": "Castro",
       "dni": "26346716",
       "nroKarting": "74",
       "posicion": 2,
       "puntos": 20
      },
      {
       "inscId": "r-inv-f2-4151",
       "nombre": "Franco",
       "apellido": "Godoy",
       "dni": "38884151",
       "nroKarting": "57",
       "posicion": 3,
       "puntos": 16
      },
      {
       "inscId": "r-inv-f2-9715",
       "nombre": "Camila",
       "apellido": "Rojas",
       "dni": "49889715",
       "nroKarting": "23",
       "posicion": 4,
       "puntos": 13
      },
      {
       "inscId": "r-inv-f2-3724",
       "nombre": "Sofía",
       "apellido": "Cabrera",
       "dni": "51493724",
       "nroKarting": "34",
       "posicion": 5,
       "puntos": 11
      },
      {
       "inscId": "r-inv-f2-7403",
       "nombre": "Gonzalo",
       "apellido": "Ríos",
       "dni": "24337403",
       "nroKarting": "92",
       "posicion": 6,
       "puntos": 10
      }
     ],
     "125 Internacional": [
      {
       "inscId": "r-inv-f2-8614",
       "nombre": "Diego",
       "apellido": "Álvarez",
       "dni": "30018614",
       "nroKarting": "61",
       "posicion": 1,
       "puntos": 25
      },
      {
       "inscId": "r-inv-f2-0877",
       "nombre": "Pablo",
       "apellido": "Correa",
       "dni": "43180877",
       "nroKarting": "63",
       "posicion": 2,
       "puntos": 20
      },
      {
       "inscId": "r-inv-f2-1839",
       "nombre": "Federico",
       "apellido": "Vázquez",
       "dni": "23721839",
       "nroKarting": "29",
       "posicion": 3,
       "puntos": 16
      },
      {
       "inscId": "r-inv-f2-3689",
       "nombre": "Ezequiel",
       "apellido": "Moreno",
       "dni": "39613689",
       "nroKarting": "96",
       "posicion": 4,
       "puntos": 13
      },
      {
       "inscId": "r-inv-f2-7799",
       "nombre": "Rodrigo",
       "apellido": "Bustos",
       "dni": "32907799",
       "nroKarting": "16",
       "posicion": 5,
       "puntos": 11
      },
      {
       "inscId": "r-inv-f2-8153",
       "nombre": "Carla",
       "apellido": "Villalba",
       "dni": "35948153",
       "nroKarting": "41",
       "posicion": 6,
       "puntos": 10
      },
      {
       "inscId": "r-inv-f2-2874",
       "nombre": "Sebastián",
       "apellido": "Luna",
       "dni": "38562874",
       "nroKarting": "20",
       "posicion": 7,
       "puntos": 9
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
      "posicion": 1,
      "puntos": 25
     },
     {
      "inscId": "r-inv-f1-4626",
      "nombre": "Lucía",
      "apellido": "Ledesma",
      "dni": "43864626",
      "nroKarting": "33",
      "posicion": 2,
      "puntos": 20
     },
     {
      "inscId": "r-inv-f1-0128",
      "nombre": "Valentina",
      "apellido": "Sosa",
      "dni": "52790128",
      "nroKarting": "99",
      "posicion": 3,
      "puntos": 16
     },
     {
      "inscId": "r-inv-f1-8050",
      "nombre": "Martina",
      "apellido": "Acosta",
      "dni": "51898050",
      "nroKarting": "66",
      "posicion": 4,
      "puntos": 13
     },
     {
      "inscId": "r-inv-f1-1829",
      "nombre": "Mía",
      "apellido": "Domínguez",
      "dni": "50451829",
      "nroKarting": "82",
      "posicion": 5,
      "puntos": 11
     },
     {
      "inscId": "r-inv-f1-6302",
      "nombre": "Joaquín",
      "apellido": "Aguirre",
      "dni": "50016302",
      "nroKarting": "58",
      "posicion": 6,
      "puntos": 10
     }
    ],
    "150 Varillero": [
     {
      "inscId": "r-inv-f1-4151",
      "nombre": "Franco",
      "apellido": "Godoy",
      "dni": "38884151",
      "nroKarting": "57",
      "posicion": 1,
      "puntos": 25
     },
     {
      "inscId": "r-inv-f1-7403",
      "nombre": "Gonzalo",
      "apellido": "Ríos",
      "dni": "24337403",
      "nroKarting": "92",
      "posicion": 2,
      "puntos": 20
     },
     {
      "inscId": "r-inv-f1-6716",
      "nombre": "Agustín",
      "apellido": "Castro",
      "dni": "26346716",
      "nroKarting": "74",
      "posicion": 3,
      "puntos": 16
     },
     {
      "inscId": "r-inv-f1-6213",
      "nombre": "Matías",
      "apellido": "Peralta",
      "dni": "41806213",
      "nroKarting": "30",
      "posicion": 4,
      "puntos": 13
     },
     {
      "inscId": "r-inv-f1-3724",
      "nombre": "Sofía",
      "apellido": "Cabrera",
      "dni": "51493724",
      "nroKarting": "34",
      "posicion": 5,
      "puntos": 11
     },
     {
      "inscId": "r-inv-f1-1634",
      "nombre": "Nicolás",
      "apellido": "Ojeda",
      "dni": "41431634",
      "nroKarting": "86",
      "posicion": 6,
      "puntos": 10
     },
     {
      "inscId": "r-inv-f1-8799",
      "nombre": "Facundo",
      "apellido": "Ruiz",
      "dni": "41898799",
      "nroKarting": "52",
      "posicion": 7,
      "puntos": 9
     }
    ],
    "125 Internacional": [
     {
      "inscId": "r-inv-f1-2874",
      "nombre": "Sebastián",
      "apellido": "Luna",
      "dni": "38562874",
      "nroKarting": "20",
      "posicion": 1,
      "puntos": 25
     },
     {
      "inscId": "r-inv-f1-0231",
      "nombre": "Leandro",
      "apellido": "Suárez",
      "dni": "42380231",
      "nroKarting": "80",
      "posicion": 2,
      "puntos": 20
     },
     {
      "inscId": "r-inv-f1-1839",
      "nombre": "Federico",
      "apellido": "Vázquez",
      "dni": "23721839",
      "nroKarting": "29",
      "posicion": 3,
      "puntos": 16
     },
     {
      "inscId": "r-inv-f1-0877",
      "nombre": "Pablo",
      "apellido": "Correa",
      "dni": "43180877",
      "nroKarting": "63",
      "posicion": 4,
      "puntos": 13
     },
     {
      "inscId": "r-inv-f1-2951",
      "nombre": "Hernán",
      "apellido": "Maidana",
      "dni": "31222951",
      "nroKarting": "55",
      "posicion": 5,
      "puntos": 11
     },
     {
      "inscId": "r-inv-f1-3485",
      "nombre": "Martín",
      "apellido": "Fernández",
      "dni": "24683485",
      "nroKarting": "98",
      "posicion": 6,
      "puntos": 10
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
     "cupo": null
    },
    {
     "nombre": "150 Varillero",
     "cupo": null
    },
    {
     "nombre": "125 Internacional",
     "cupo": null
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
      "posicion": 1,
      "puntos": 25
     },
     {
      "inscId": "r-f1-09",
      "nombre": "Joaquín",
      "apellido": "Aguirre",
      "dni": "50016302",
      "nroKarting": "58",
      "posicion": 2,
      "puntos": 20
     },
     {
      "inscId": "r-f1-06",
      "nombre": "Lautaro",
      "apellido": "Benítez",
      "dni": "52301946",
      "nroKarting": "15",
      "posicion": 3,
      "puntos": 16
     },
     {
      "inscId": "r-f1-01",
      "nombre": "Benjamín",
      "apellido": "Ferreyra",
      "dni": "51001346",
      "nroKarting": "18",
      "posicion": 4,
      "puntos": 13
     },
     {
      "inscId": "r-f1-10",
      "nombre": "Mía",
      "apellido": "Domínguez",
      "dni": "50451829",
      "nroKarting": "82",
      "posicion": 5,
      "puntos": 11
     },
     {
      "inscId": "r-f1-11",
      "nombre": "Felipe",
      "apellido": "Quiroga",
      "dni": "51481714",
      "nroKarting": "21",
      "posicion": 6,
      "puntos": 10
     },
     {
      "inscId": "r-f1-12",
      "nombre": "Lucía",
      "apellido": "Ledesma",
      "dni": "43864626",
      "nroKarting": "33",
      "posicion": 7,
      "puntos": 9
     },
     {
      "inscId": "r-f1-03",
      "nombre": "Thiago",
      "apellido": "Giménez",
      "dni": "51386584",
      "nroKarting": "59",
      "posicion": 8,
      "puntos": 8
     }
    ],
    "150 Varillero": [
     {
      "inscId": "r-f1-14",
      "nombre": "Tomás",
      "apellido": "Molina",
      "dni": "50629637",
      "nroKarting": "26",
      "posicion": 1,
      "puntos": 25
     },
     {
      "inscId": "r-f1-15",
      "nombre": "Agustín",
      "apellido": "Castro",
      "dni": "26346716",
      "nroKarting": "74",
      "posicion": 2,
      "puntos": 20
     },
     {
      "inscId": "r-f1-18",
      "nombre": "Nicolás",
      "apellido": "Ojeda",
      "dni": "41431634",
      "nroKarting": "86",
      "posicion": 3,
      "puntos": 16
     },
     {
      "inscId": "r-f1-24",
      "nombre": "Sofía",
      "apellido": "Cabrera",
      "dni": "51493724",
      "nroKarting": "34",
      "posicion": 4,
      "puntos": 13
     },
     {
      "inscId": "r-f1-22",
      "nombre": "Matías",
      "apellido": "Peralta",
      "dni": "41806213",
      "nroKarting": "30",
      "posicion": 5,
      "puntos": 11
     },
     {
      "inscId": "r-f1-16",
      "nombre": "Camila",
      "apellido": "Rojas",
      "dni": "49889715",
      "nroKarting": "23",
      "posicion": 6,
      "puntos": 10
     }
    ],
    "125 Internacional": [
     {
      "inscId": "r-f1-30",
      "nombre": "Hernán",
      "apellido": "Maidana",
      "dni": "31222951",
      "nroKarting": "55",
      "posicion": 1,
      "puntos": 25
     },
     {
      "inscId": "r-f1-28",
      "nombre": "Pablo",
      "apellido": "Correa",
      "dni": "43180877",
      "nroKarting": "63",
      "posicion": 2,
      "puntos": 20
     },
     {
      "inscId": "r-f1-32",
      "nombre": "Rodrigo",
      "apellido": "Bustos",
      "dni": "32907799",
      "nroKarting": "16",
      "posicion": 3,
      "puntos": 16
     },
     {
      "inscId": "r-f1-27",
      "nombre": "Leandro",
      "apellido": "Suárez",
      "dni": "42380231",
      "nroKarting": "80",
      "posicion": 4,
      "puntos": 13
     },
     {
      "inscId": "r-f1-29",
      "nombre": "Sebastián",
      "apellido": "Luna",
      "dni": "38562874",
      "nroKarting": "20",
      "posicion": 5,
      "puntos": 11
     },
     {
      "inscId": "r-f1-34",
      "nombre": "Carla",
      "apellido": "Villalba",
      "dni": "35948153",
      "nroKarting": "41",
      "posicion": 6,
      "puntos": 10
     },
     {
      "inscId": "r-f1-26",
      "nombre": "Diego",
      "apellido": "Álvarez",
      "dni": "30018614",
      "nroKarting": "61",
      "posicion": 7,
      "puntos": 9
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
       "posicion": 1,
       "puntos": 25
      },
      {
       "inscId": "r-f1-09",
       "nombre": "Joaquín",
       "apellido": "Aguirre",
       "dni": "50016302",
       "nroKarting": "58",
       "posicion": 2,
       "puntos": 20
      },
      {
       "inscId": "r-f1-06",
       "nombre": "Lautaro",
       "apellido": "Benítez",
       "dni": "52301946",
       "nroKarting": "15",
       "posicion": 3,
       "puntos": 16
      },
      {
       "inscId": "r-f1-01",
       "nombre": "Benjamín",
       "apellido": "Ferreyra",
       "dni": "51001346",
       "nroKarting": "18",
       "posicion": 4,
       "puntos": 13
      },
      {
       "inscId": "r-f1-10",
       "nombre": "Mía",
       "apellido": "Domínguez",
       "dni": "50451829",
       "nroKarting": "82",
       "posicion": 5,
       "puntos": 11
      },
      {
       "inscId": "r-f1-11",
       "nombre": "Felipe",
       "apellido": "Quiroga",
       "dni": "51481714",
       "nroKarting": "21",
       "posicion": 6,
       "puntos": 10
      },
      {
       "inscId": "r-f1-12",
       "nombre": "Lucía",
       "apellido": "Ledesma",
       "dni": "43864626",
       "nroKarting": "33",
       "posicion": 7,
       "puntos": 9
      },
      {
       "inscId": "r-f1-03",
       "nombre": "Thiago",
       "apellido": "Giménez",
       "dni": "51386584",
       "nroKarting": "59",
       "posicion": 8,
       "puntos": 8
      }
     ],
     "150 Varillero": [
      {
       "inscId": "r-f1-14",
       "nombre": "Tomás",
       "apellido": "Molina",
       "dni": "50629637",
       "nroKarting": "26",
       "posicion": 1,
       "puntos": 25
      },
      {
       "inscId": "r-f1-15",
       "nombre": "Agustín",
       "apellido": "Castro",
       "dni": "26346716",
       "nroKarting": "74",
       "posicion": 2,
       "puntos": 20
      },
      {
       "inscId": "r-f1-18",
       "nombre": "Nicolás",
       "apellido": "Ojeda",
       "dni": "41431634",
       "nroKarting": "86",
       "posicion": 3,
       "puntos": 16
      },
      {
       "inscId": "r-f1-24",
       "nombre": "Sofía",
       "apellido": "Cabrera",
       "dni": "51493724",
       "nroKarting": "34",
       "posicion": 4,
       "puntos": 13
      },
      {
       "inscId": "r-f1-22",
       "nombre": "Matías",
       "apellido": "Peralta",
       "dni": "41806213",
       "nroKarting": "30",
       "posicion": 5,
       "puntos": 11
      },
      {
       "inscId": "r-f1-16",
       "nombre": "Camila",
       "apellido": "Rojas",
       "dni": "49889715",
       "nroKarting": "23",
       "posicion": 6,
       "puntos": 10
      }
     ],
     "125 Internacional": [
      {
       "inscId": "r-f1-30",
       "nombre": "Hernán",
       "apellido": "Maidana",
       "dni": "31222951",
       "nroKarting": "55",
       "posicion": 1,
       "puntos": 25
      },
      {
       "inscId": "r-f1-28",
       "nombre": "Pablo",
       "apellido": "Correa",
       "dni": "43180877",
       "nroKarting": "63",
       "posicion": 2,
       "puntos": 20
      },
      {
       "inscId": "r-f1-32",
       "nombre": "Rodrigo",
       "apellido": "Bustos",
       "dni": "32907799",
       "nroKarting": "16",
       "posicion": 3,
       "puntos": 16
      },
      {
       "inscId": "r-f1-27",
       "nombre": "Leandro",
       "apellido": "Suárez",
       "dni": "42380231",
       "nroKarting": "80",
       "posicion": 4,
       "puntos": 13
      },
      {
       "inscId": "r-f1-29",
       "nombre": "Sebastián",
       "apellido": "Luna",
       "dni": "38562874",
       "nroKarting": "20",
       "posicion": 5,
       "puntos": 11
      },
      {
       "inscId": "r-f1-34",
       "nombre": "Carla",
       "apellido": "Villalba",
       "dni": "35948153",
       "nroKarting": "41",
       "posicion": 6,
       "puntos": 10
      },
      {
       "inscId": "r-f1-26",
       "nombre": "Diego",
       "apellido": "Álvarez",
       "dni": "30018614",
       "nroKarting": "61",
       "posicion": 7,
       "puntos": 9
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
       "posicion": 1,
       "puntos": 25
      },
      {
       "inscId": "r-f2-06",
       "nombre": "Lautaro",
       "apellido": "Benítez",
       "dni": "52301946",
       "nroKarting": "15",
       "posicion": 2,
       "puntos": 20
      },
      {
       "inscId": "r-f2-07",
       "nombre": "Catalina",
       "apellido": "Medina",
       "dni": "50112382",
       "nroKarting": "27",
       "posicion": 3,
       "puntos": 16
      },
      {
       "inscId": "r-f2-08",
       "nombre": "Santino",
       "apellido": "Herrera",
       "dni": "52224695",
       "nroKarting": "97",
       "posicion": 4,
       "puntos": 13
      },
      {
       "inscId": "r-f2-04",
       "nombre": "Martina",
       "apellido": "Acosta",
       "dni": "51898050",
       "nroKarting": "66",
       "posicion": 5,
       "puntos": 11
      },
      {
       "inscId": "r-f2-03",
       "nombre": "Thiago",
       "apellido": "Giménez",
       "dni": "51386584",
       "nroKarting": "59",
       "posicion": 6,
       "puntos": 10
      },
      {
       "inscId": "r-f2-02",
       "nombre": "Valentina",
       "apellido": "Sosa",
       "dni": "52790128",
       "nroKarting": "99",
       "posicion": 7,
       "puntos": 9
      }
     ],
     "150 Varillero": [
      {
       "inscId": "r-f2-20",
       "nombre": "Franco",
       "apellido": "Godoy",
       "dni": "38884151",
       "nroKarting": "57",
       "posicion": 1,
       "puntos": 25
      },
      {
       "inscId": "r-f2-15",
       "nombre": "Agustín",
       "apellido": "Castro",
       "dni": "26346716",
       "nroKarting": "74",
       "posicion": 2,
       "puntos": 20
      },
      {
       "inscId": "r-f2-18",
       "nombre": "Nicolás",
       "apellido": "Ojeda",
       "dni": "41431634",
       "nroKarting": "86",
       "posicion": 3,
       "puntos": 16
      },
      {
       "inscId": "r-f2-21",
       "nombre": "Julieta",
       "apellido": "Navarro",
       "dni": "41851270",
       "nroKarting": "53",
       "posicion": 4,
       "puntos": 13
      },
      {
       "inscId": "r-f2-24",
       "nombre": "Sofía",
       "apellido": "Cabrera",
       "dni": "51493724",
       "nroKarting": "34",
       "posicion": 5,
       "puntos": 11
      },
      {
       "inscId": "r-f2-22",
       "nombre": "Matías",
       "apellido": "Peralta",
       "dni": "41806213",
       "nroKarting": "30",
       "posicion": 6,
       "puntos": 10
      },
      {
       "inscId": "r-f2-16",
       "nombre": "Camila",
       "apellido": "Rojas",
       "dni": "49889715",
       "nroKarting": "23",
       "posicion": 7,
       "puntos": 9
      },
      {
       "inscId": "r-f2-17",
       "nombre": "Facundo",
       "apellido": "Ruiz",
       "dni": "41898799",
       "nroKarting": "52",
       "posicion": 8,
       "puntos": 8
      },
      {
       "inscId": "r-f2-23",
       "nombre": "Gonzalo",
       "apellido": "Ríos",
       "dni": "24337403",
       "nroKarting": "92",
       "posicion": 9,
       "puntos": 7
      }
     ],
     "125 Internacional": [
      {
       "inscId": "r-f2-30",
       "nombre": "Hernán",
       "apellido": "Maidana",
       "dni": "31222951",
       "nroKarting": "55",
       "posicion": 1,
       "puntos": 25
      },
      {
       "inscId": "r-f2-31",
       "nombre": "Federico",
       "apellido": "Vázquez",
       "dni": "23721839",
       "nroKarting": "29",
       "posicion": 2,
       "puntos": 20
      },
      {
       "inscId": "r-f2-27",
       "nombre": "Leandro",
       "apellido": "Suárez",
       "dni": "42380231",
       "nroKarting": "80",
       "posicion": 3,
       "puntos": 16
      },
      {
       "inscId": "r-f2-34",
       "nombre": "Carla",
       "apellido": "Villalba",
       "dni": "35948153",
       "nroKarting": "41",
       "posicion": 4,
       "puntos": 13
      },
      {
       "inscId": "r-f2-33",
       "nombre": "Emiliano",
       "apellido": "Ortiz",
       "dni": "40764201",
       "nroKarting": "60",
       "posicion": 5,
       "puntos": 11
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
       "posicion": 1,
       "puntos": 25
      },
      {
       "inscId": "r-f3-08",
       "nombre": "Santino",
       "apellido": "Herrera",
       "dni": "52224695",
       "nroKarting": "97",
       "posicion": 2,
       "puntos": 20
      },
      {
       "inscId": "r-f3-11",
       "nombre": "Felipe",
       "apellido": "Quiroga",
       "dni": "51481714",
       "nroKarting": "21",
       "posicion": 3,
       "puntos": 16
      },
      {
       "inscId": "r-f3-10",
       "nombre": "Mía",
       "apellido": "Domínguez",
       "dni": "50451829",
       "nroKarting": "82",
       "posicion": 4,
       "puntos": 13
      },
      {
       "inscId": "r-f3-12",
       "nombre": "Lucía",
       "apellido": "Ledesma",
       "dni": "43864626",
       "nroKarting": "33",
       "posicion": 5,
       "puntos": 11
      },
      {
       "inscId": "r-f3-03",
       "nombre": "Thiago",
       "apellido": "Giménez",
       "dni": "51386584",
       "nroKarting": "59",
       "posicion": 6,
       "puntos": 10
      }
     ],
     "150 Varillero": [
      {
       "inscId": "r-f3-14",
       "nombre": "Tomás",
       "apellido": "Molina",
       "dni": "50629637",
       "nroKarting": "26",
       "posicion": 1,
       "puntos": 25
      },
      {
       "inscId": "r-f3-20",
       "nombre": "Franco",
       "apellido": "Godoy",
       "dni": "38884151",
       "nroKarting": "57",
       "posicion": 2,
       "puntos": 20
      },
      {
       "inscId": "r-f3-18",
       "nombre": "Nicolás",
       "apellido": "Ojeda",
       "dni": "41431634",
       "nroKarting": "86",
       "posicion": 3,
       "puntos": 16
      },
      {
       "inscId": "r-f3-21",
       "nombre": "Julieta",
       "apellido": "Navarro",
       "dni": "41851270",
       "nroKarting": "53",
       "posicion": 4,
       "puntos": 13
      },
      {
       "inscId": "r-f3-24",
       "nombre": "Sofía",
       "apellido": "Cabrera",
       "dni": "51493724",
       "nroKarting": "34",
       "posicion": 5,
       "puntos": 11
      },
      {
       "inscId": "r-f3-22",
       "nombre": "Matías",
       "apellido": "Peralta",
       "dni": "41806213",
       "nroKarting": "30",
       "posicion": 6,
       "puntos": 10
      },
      {
       "inscId": "r-f3-17",
       "nombre": "Facundo",
       "apellido": "Ruiz",
       "dni": "41898799",
       "nroKarting": "52",
       "posicion": 7,
       "puntos": 9
      }
     ],
     "125 Internacional": [
      {
       "inscId": "r-f3-31",
       "nombre": "Federico",
       "apellido": "Vázquez",
       "dni": "23721839",
       "nroKarting": "29",
       "posicion": 1,
       "puntos": 25
      },
      {
       "inscId": "r-f3-28",
       "nombre": "Pablo",
       "apellido": "Correa",
       "dni": "43180877",
       "nroKarting": "63",
       "posicion": 2,
       "puntos": 20
      },
      {
       "inscId": "r-f3-29",
       "nombre": "Sebastián",
       "apellido": "Luna",
       "dni": "38562874",
       "nroKarting": "20",
       "posicion": 3,
       "puntos": 16
      },
      {
       "inscId": "r-f3-27",
       "nombre": "Leandro",
       "apellido": "Suárez",
       "dni": "42380231",
       "nroKarting": "80",
       "posicion": 4,
       "puntos": 13
      },
      {
       "inscId": "r-f3-34",
       "nombre": "Carla",
       "apellido": "Villalba",
       "dni": "35948153",
       "nroKarting": "41",
       "posicion": 5,
       "puntos": 11
      },
      {
       "inscId": "r-f3-33",
       "nombre": "Emiliano",
       "apellido": "Ortiz",
       "dni": "40764201",
       "nroKarting": "60",
       "posicion": 6,
       "puntos": 10
      },
      {
       "inscId": "r-f3-35",
       "nombre": "Ezequiel",
       "apellido": "Moreno",
       "dni": "39613689",
       "nroKarting": "96",
       "posicion": 7,
       "puntos": 9
      },
      {
       "inscId": "r-f3-25",
       "nombre": "Martín",
       "apellido": "Fernández",
       "dni": "24683485",
       "nroKarting": "98",
       "posicion": 8,
       "puntos": 8
      }
     ]
    }
   },
   "ejemplo": true
  },
  {
   "id": "t-2026-f4",
   "nombre": "RGK Santafesino — Fecha 7",
   "fecha": "2026-10-24",
   "lugar": "Autoclub Cañada de Gómez",
   "estado": "actual",
   "categorias": [
    {
     "nombre": "110 Escuela",
     "cupo": null
    },
    {
     "nombre": "150 Varillero Juvenil",
     "cupo": null
    },
    {
     "nombre": "150 Varillero",
     "cupo": null
    },
    {
     "nombre": "150 Cadenero",
     "cupo": null
    },
    {
     "nombre": "150 Multimarca",
     "cupo": null
    },
    {
     "nombre": "150 Multi.Senior",
     "cupo": null
    },
    {
     "nombre": "125 Promocional",
     "cupo": null
    },
    {
     "nombre": "125 Inter.Juvenil",
     "cupo": null
    },
    {
     "nombre": "125 Internacional",
     "cupo": null
    },
    {
     "nombre": "125 Inter. Promocional",
     "cupo": null
    },
    {
     "nombre": "125 Inter.Senior",
     "cupo": null
    },
    {
     "nombre": "125 Inter.Master",
     "cupo": null
    }
   ],
   "notas": "Apertura del predio 10am\nApertura de inscripción 11am\nComienzo de pruebas libres y cronometradas 13hs",
   "creado": "2026-10-05T13:00:00.000Z",
   "ejemplo": true,
   "fechas": [
    "2026-10-24",
    "2026-11-22"
   ],
   "sentido": "horario"
  },
  {
   "id": "t-2026-f5",
   "nombre": "RGK Santafesino — Fecha 8",
   "fecha": "2026-12-05",
   "lugar": "Autoclub Cañada de Gómez",
   "estado": "proximo",
   "categorias": [
    {
     "nombre": "110 Escuela",
     "cupo": null
    },
    {
     "nombre": "150 Varillero Juvenil",
     "cupo": null
    },
    {
     "nombre": "150 Varillero",
     "cupo": null
    },
    {
     "nombre": "150 Cadenero",
     "cupo": null
    },
    {
     "nombre": "150 Multimarca",
     "cupo": null
    },
    {
     "nombre": "150 Multi.Senior",
     "cupo": null
    },
    {
     "nombre": "125 Promocional",
     "cupo": null
    },
    {
     "nombre": "125 Inter.Juvenil",
     "cupo": null
    },
    {
     "nombre": "125 Internacional",
     "cupo": null
    },
    {
     "nombre": "125 Inter. Promocional",
     "cupo": null
    },
    {
     "nombre": "125 Inter.Senior",
     "cupo": null
    },
    {
     "nombre": "125 Inter.Master",
     "cupo": null
    }
   ],
   "notas": "",
   "creado": "2026-10-06T15:20:00.000Z",
   "ejemplo": true,
   "fechas": [
    "2026-12-05",
    "2026-12-06"
   ],
   "sentido": "antihorario"
  },
  {
   "id": "t-2026-f6",
   "nombre": "RGK Santafesino — Copa de Fin de Año",
   "fecha": "2026-11-29",
   "fechas": [
    "2026-11-29",
    "2026-12-06",
    "2026-12-13",
    "2026-12-20"
   ],
   "lugar": "Autoclub Cañada de Gómez",
   "estado": "proximo",
   "categorias": [
    {
     "nombre": "110 Escuela",
     "cupo": null
    },
    {
     "nombre": "150 Varillero Juvenil",
     "cupo": null
    },
    {
     "nombre": "150 Varillero",
     "cupo": null
    },
    {
     "nombre": "150 Cadenero",
     "cupo": null
    },
    {
     "nombre": "150 Multimarca",
     "cupo": null
    },
    {
     "nombre": "150 Multi.Senior",
     "cupo": null
    },
    {
     "nombre": "125 Promocional",
     "cupo": null
    },
    {
     "nombre": "125 Inter.Juvenil",
     "cupo": null
    },
    {
     "nombre": "125 Internacional",
     "cupo": null
    },
    {
     "nombre": "125 Inter. Promocional",
     "cupo": null
    },
    {
     "nombre": "125 Inter.Senior",
     "cupo": null
    },
    {
     "nombre": "125 Inter.Master",
     "cupo": null
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
   "direccion": "Colón 4454",
   "telefono": "+54 9 3471 80-3310",
   "email": "nicolas.ojeda@ejemplo.com",
   "nroKarting": "86",
   "creado": "2026-10-05T22:23:07.000Z",
   "actualizado": "2026-10-05T22:23:07.000Z",
   "ejemplo": true,
   "categorias": [
    "150 Varillero"
   ],
   "fechaNacimiento": "1993-04-16",
   "provincia": "Santa Fe",
   "localidad": "Santa Fe",
   "grupoSanguineo": "A+",
   "obraSocial": "",
   "emergenciaNombre": "Gabriel Ojeda",
   "emergenciaTelefono": "+54 9 3471 44-4735",
   "licenciaDeportiva": null,
   "licenciaMedica": null,
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-05T22:23:07.000Z"
   }
  },
  {
   "id": "i-002",
   "torneoId": "t-2026-f4",
   "categoria": "110 Escuela",
   "nombre": "Mateo",
   "apellido": "Patricelli",
   "dni": "52000000",
   "direccion": "Tucumán 4227",
   "telefono": "+54 9 3471 63-0438",
   "email": "mateo.patricelli@ejemplo.com",
   "nroKarting": "134",
   "creado": "2026-10-05T12:59:33.000Z",
   "actualizado": "2026-10-05T12:59:33.000Z",
   "ejemplo": true,
   "categorias": [
    "110 Escuela"
   ],
   "fechaNacimiento": "2016-03-28",
   "provincia": "Santa Fe",
   "localidad": "Cañada de Gómez",
   "grupoSanguineo": "0+",
   "obraSocial": "Galeno – Afiliado N.º 93161213",
   "emergenciaNombre": "Jorge Patricelli",
   "emergenciaTelefono": "+54 9 3471 84-4733",
   "licenciaDeportiva": {
    "assetId": "ejemplo-licencia-deportiva",
    "nombre": "licencia_deportiva.jpg",
    "tipo": "image/jpeg",
    "tamano": 412330
   },
   "licenciaMedica": {
    "assetId": "ejemplo-licencia-medica",
    "nombre": "licencia_medica.pdf",
    "tipo": "application/pdf",
    "tamano": 228114
   },
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-05T12:59:33.000Z"
   }
  },
  {
   "id": "i-003",
   "torneoId": "t-2026-f4",
   "categoria": "110 Escuela",
   "nombre": "Felipe",
   "apellido": "Cortel",
   "dni": "52137911",
   "direccion": "Las Heras 3547",
   "telefono": "+54 9 3471 44-1347",
   "email": "felipe.cortel@ejemplo.com",
   "nroKarting": "45",
   "creado": "2026-10-06T13:12:24.000Z",
   "actualizado": "2026-10-06T13:12:24.000Z",
   "ejemplo": true,
   "categorias": [
    "110 Escuela"
   ],
   "fechaNacimiento": "2014-06-06",
   "provincia": "Santa Fe",
   "localidad": "Rafaela",
   "grupoSanguineo": "AB+",
   "obraSocial": "OSDE – Afiliado N.º 74483946",
   "emergenciaNombre": "María Cortel",
   "emergenciaTelefono": "+54 9 3471 91-7926",
   "licenciaDeportiva": null,
   "licenciaMedica": null,
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-06T13:12:24.000Z"
   }
  },
  {
   "id": "i-004",
   "torneoId": "t-2026-f4",
   "categoria": "150 Multimarca",
   "nombre": "Gonzalo",
   "apellido": "Ríos",
   "dni": "24337403",
   "direccion": "San Martín 1233",
   "telefono": "+54 9 3471 49-0164",
   "email": "gonzalo.rios@ejemplo.com",
   "nroKarting": "92",
   "creado": "2026-10-06T19:58:18.000Z",
   "actualizado": "2026-10-06T19:58:18.000Z",
   "ejemplo": true,
   "categorias": [
    "150 Multimarca"
   ],
   "fechaNacimiento": "1985-09-02",
   "provincia": "Santa Fe",
   "localidad": "Casilda",
   "grupoSanguineo": "B+",
   "obraSocial": "IAPOS – Afiliado N.º 81116732",
   "emergenciaNombre": "Roberto Ríos",
   "emergenciaTelefono": "+54 9 3471 92-4668",
   "licenciaDeportiva": {
    "assetId": "ejemplo-licencia-deportiva",
    "nombre": "licencia_deportiva.jpg",
    "tipo": "image/jpeg",
    "tamano": 412330
   },
   "licenciaMedica": null,
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-06T19:58:18.000Z"
   }
  },
  {
   "id": "i-005",
   "torneoId": "t-2026-f4",
   "categoria": "110 Escuela",
   "nombre": "Tomás",
   "apellido": "Bresan",
   "dni": "52275822",
   "direccion": "Laprida 3468",
   "telefono": "+54 9 3471 57-9001",
   "email": "tomas.bresan@ejemplo.com",
   "nroKarting": "52",
   "creado": "2026-10-07T09:35:53.000Z",
   "actualizado": "2026-10-07T09:35:53.000Z",
   "ejemplo": true,
   "categorias": [
    "110 Escuela"
   ],
   "fechaNacimiento": "2016-06-17",
   "provincia": "Santa Fe",
   "localidad": "Firmat",
   "grupoSanguineo": "AB+",
   "obraSocial": "IAPOS – Afiliado N.º 74570286",
   "emergenciaNombre": "Jorge Bresan",
   "emergenciaTelefono": "+54 9 3471 63-9678",
   "licenciaDeportiva": {
    "assetId": "ejemplo-licencia-deportiva",
    "nombre": "licencia_deportiva.jpg",
    "tipo": "image/jpeg",
    "tamano": 412330
   },
   "licenciaMedica": null,
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-07T09:35:53.000Z"
   }
  },
  {
   "id": "i-006",
   "torneoId": "t-2026-f4",
   "categoria": "150 Varillero Juvenil",
   "nombre": "Franco",
   "apellido": "Godoy",
   "dni": "38884151",
   "direccion": "Las Heras 941",
   "telefono": "+54 9 3471 44-7788",
   "email": "franco.godoy@ejemplo.com",
   "nroKarting": "57",
   "creado": "2026-10-07T16:17:37.000Z",
   "actualizado": "2026-10-07T16:17:37.000Z",
   "ejemplo": true,
   "categorias": [
    "150 Varillero Juvenil",
    "150 Multi.Senior"
   ],
   "fechaNacimiento": "1995-06-09",
   "provincia": "Santa Fe",
   "localidad": "Firmat",
   "grupoSanguineo": "0-",
   "obraSocial": "OSDE – Afiliado N.º 86515853",
   "emergenciaNombre": "Laura Godoy",
   "emergenciaTelefono": "+54 9 3471 77-0540",
   "licenciaDeportiva": null,
   "licenciaMedica": null,
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-07T16:17:37.000Z"
   }
  },
  {
   "id": "i-007",
   "torneoId": "t-2026-f4",
   "categoria": "110 Escuela",
   "nombre": "Cristóbal",
   "apellido": "López",
   "dni": "52413733",
   "direccion": "Alsina 1047",
   "telefono": "+54 9 3471 80-8129",
   "email": "cristobal.lopez@ejemplo.com",
   "nroKarting": "111",
   "creado": "2026-10-08T09:01:45.000Z",
   "actualizado": "2026-10-08T09:01:45.000Z",
   "ejemplo": true,
   "categorias": [
    "110 Escuela"
   ],
   "fechaNacimiento": "2016-06-12",
   "provincia": "Santa Fe",
   "localidad": "Correa",
   "grupoSanguineo": "0+",
   "obraSocial": "Galeno – Afiliado N.º 10032508",
   "emergenciaNombre": "María López",
   "emergenciaTelefono": "+54 9 3471 86-6164",
   "licenciaDeportiva": null,
   "licenciaMedica": null,
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-08T09:01:45.000Z"
   }
  },
  {
   "id": "i-008",
   "torneoId": "t-2026-f4",
   "categoria": "150 Multimarca",
   "nombre": "Matías",
   "apellido": "Peralta",
   "dni": "41806213",
   "direccion": "Av. Calchaquí 3054",
   "telefono": "+54 9 3471 57-5428",
   "email": "matias.peralta@ejemplo.com",
   "nroKarting": "30",
   "creado": "2026-10-08T10:20:33.000Z",
   "actualizado": "2026-10-08T10:20:33.000Z",
   "ejemplo": true,
   "categorias": [
    "150 Multimarca"
   ],
   "fechaNacimiento": "1998-05-15",
   "provincia": "Santa Fe",
   "localidad": "Rosario",
   "grupoSanguineo": "AB+",
   "obraSocial": "Galeno – Afiliado N.º 15297062",
   "emergenciaNombre": "Andrea Peralta",
   "emergenciaTelefono": "+54 9 3471 81-2268",
   "licenciaDeportiva": {
    "assetId": "ejemplo-licencia-deportiva",
    "nombre": "licencia_deportiva.jpg",
    "tipo": "image/jpeg",
    "tamano": 412330
   },
   "licenciaMedica": {
    "assetId": "ejemplo-licencia-medica",
    "nombre": "licencia_medica.pdf",
    "tipo": "application/pdf",
    "tamano": 228114
   },
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-08T10:20:33.000Z"
   }
  },
  {
   "id": "i-009",
   "torneoId": "t-2026-f4",
   "categoria": "125 Internacional",
   "nombre": "Sebastián",
   "apellido": "Luna",
   "dni": "38562874",
   "direccion": "Moreno 1837",
   "telefono": "+54 9 3471 67-3077",
   "email": "sebastian.luna@ejemplo.com",
   "nroKarting": "20",
   "creado": "2026-10-09T11:46:30.000Z",
   "actualizado": "2026-10-09T11:46:30.000Z",
   "ejemplo": true,
   "categorias": [
    "125 Internacional"
   ],
   "fechaNacimiento": "2005-10-09",
   "provincia": "Santa Fe",
   "localidad": "Rosario",
   "grupoSanguineo": "0-",
   "obraSocial": "OSDE – Afiliado N.º 47901535",
   "emergenciaNombre": "Jorge Luna",
   "emergenciaTelefono": "+54 9 3471 99-4312",
   "licenciaDeportiva": {
    "assetId": "ejemplo-licencia-deportiva",
    "nombre": "licencia_deportiva.jpg",
    "tipo": "image/jpeg",
    "tamano": 412330
   },
   "licenciaMedica": {
    "assetId": "ejemplo-licencia-medica",
    "nombre": "licencia_medica.pdf",
    "tipo": "application/pdf",
    "tamano": 228114
   },
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-09T11:46:30.000Z"
   }
  },
  {
   "id": "i-010",
   "torneoId": "t-2026-f4",
   "categoria": "125 Promocional",
   "nombre": "Carla",
   "apellido": "Villalba",
   "dni": "35948153",
   "direccion": "Brown 2735",
   "telefono": "+54 9 3471 69-7261",
   "email": "carla.villalba@ejemplo.com",
   "nroKarting": "41",
   "creado": "2026-10-09T18:53:19.000Z",
   "actualizado": "2026-10-09T18:53:19.000Z",
   "ejemplo": true,
   "categorias": [
    "125 Promocional",
    "125 Inter.Master"
   ],
   "fechaNacimiento": "1988-12-08",
   "provincia": "Santa Fe",
   "localidad": "Rosario",
   "grupoSanguineo": "A+",
   "obraSocial": "",
   "emergenciaNombre": "Daniel Villalba",
   "emergenciaTelefono": "+54 9 3471 96-6395",
   "licenciaDeportiva": null,
   "licenciaMedica": null,
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-09T18:53:19.000Z"
   }
  },
  {
   "id": "i-011",
   "torneoId": "t-2026-f4",
   "categoria": "110 Escuela",
   "nombre": "Lorenzo",
   "apellido": "Carruba",
   "dni": "52551644",
   "direccion": "Güemes 2748",
   "telefono": "+54 9 3471 93-3187",
   "email": "lorenzo.carruba@ejemplo.com",
   "nroKarting": "16",
   "creado": "2026-10-10T13:37:24.000Z",
   "actualizado": "2026-10-10T13:37:24.000Z",
   "ejemplo": true,
   "categorias": [
    "110 Escuela"
   ],
   "fechaNacimiento": "2014-11-11",
   "provincia": "Santa Fe",
   "localidad": "Carcarañá",
   "grupoSanguineo": "A+",
   "obraSocial": "Sancor Salud – Afiliado N.º 90875585",
   "emergenciaNombre": "Jorge Carruba",
   "emergenciaTelefono": "+54 9 3471 50-8221",
   "licenciaDeportiva": {
    "assetId": "ejemplo-licencia-deportiva",
    "nombre": "licencia_deportiva.jpg",
    "tipo": "image/jpeg",
    "tamano": 412330
   },
   "licenciaMedica": {
    "assetId": "ejemplo-licencia-medica",
    "nombre": "licencia_medica.pdf",
    "tipo": "application/pdf",
    "tamano": 228114
   },
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-10T13:37:24.000Z"
   }
  },
  {
   "id": "i-012",
   "torneoId": "t-2026-f4",
   "categoria": "125 Inter.Juvenil",
   "nombre": "Rodrigo",
   "apellido": "Bustos",
   "dni": "32907799",
   "direccion": "Brown 1123",
   "telefono": "+54 9 3471 88-9271",
   "email": "rodrigo.bustos@ejemplo.com",
   "nroKarting": "16",
   "creado": "2026-10-10T21:04:14.000Z",
   "actualizado": "2026-10-10T21:04:14.000Z",
   "ejemplo": true,
   "categorias": [
    "125 Inter.Juvenil"
   ],
   "fechaNacimiento": "2000-01-04",
   "provincia": "Santa Fe",
   "localidad": "Correa",
   "grupoSanguineo": "0+",
   "obraSocial": "Swiss Medical – Afiliado N.º 26706160",
   "emergenciaNombre": "Laura Bustos",
   "emergenciaTelefono": "+54 9 3471 78-5685",
   "licenciaDeportiva": null,
   "licenciaMedica": null,
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-10T21:04:14.000Z"
   }
  },
  {
   "id": "i-013",
   "torneoId": "t-2026-f4",
   "categoria": "150 Varillero",
   "nombre": "Sofía",
   "apellido": "Cabrera",
   "dni": "51493724",
   "direccion": "San Martín 3214",
   "telefono": "+54 9 3471 89-4011",
   "email": "sofia.cabrera@ejemplo.com",
   "nroKarting": "34",
   "creado": "2026-10-11T14:18:34.000Z",
   "actualizado": "2026-10-11T14:18:34.000Z",
   "ejemplo": true,
   "categorias": [
    "150 Varillero"
   ],
   "fechaNacimiento": "1983-03-20",
   "provincia": "Santa Fe",
   "localidad": "Cañada de Gómez",
   "grupoSanguineo": "A+",
   "obraSocial": "Galeno – Afiliado N.º 19973193",
   "emergenciaNombre": "Andrea Cabrera",
   "emergenciaTelefono": "+54 9 3471 61-3111",
   "licenciaDeportiva": {
    "assetId": "ejemplo-licencia-deportiva",
    "nombre": "licencia_deportiva.jpg",
    "tipo": "image/jpeg",
    "tamano": 412330
   },
   "licenciaMedica": {
    "assetId": "ejemplo-licencia-medica",
    "nombre": "licencia_medica.pdf",
    "tipo": "application/pdf",
    "tamano": 228114
   },
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-11T14:18:34.000Z"
   }
  },
  {
   "id": "i-014",
   "torneoId": "t-2026-f4",
   "categoria": "150 Varillero Juvenil",
   "nombre": "Agustín",
   "apellido": "Castro",
   "dni": "26346716",
   "direccion": "Las Heras 4080",
   "telefono": "+54 9 3471 75-0731",
   "email": "agustin.castro@ejemplo.com",
   "nroKarting": "74",
   "creado": "2026-10-11T22:39:01.000Z",
   "actualizado": "2026-10-11T22:39:01.000Z",
   "ejemplo": true,
   "categorias": [
    "150 Varillero Juvenil",
    "150 Multi.Senior"
   ],
   "fechaNacimiento": "1983-06-28",
   "provincia": "Santa Fe",
   "localidad": "Cañada de Gómez",
   "grupoSanguineo": "B+",
   "obraSocial": "Galeno – Afiliado N.º 79014288",
   "emergenciaNombre": "Daniel Castro",
   "emergenciaTelefono": "+54 9 3471 43-0814",
   "licenciaDeportiva": null,
   "licenciaMedica": null,
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-11T22:39:01.000Z"
   }
  },
  {
   "id": "i-015",
   "torneoId": "t-2026-f4",
   "categoria": "110 Escuela",
   "nombre": "Facundo",
   "apellido": "Cinalli",
   "dni": "52689555",
   "direccion": "Laprida 716",
   "telefono": "+54 9 3471 49-4461",
   "email": "facundo.cinalli@ejemplo.com",
   "nroKarting": "40",
   "creado": "2026-10-12T18:35:40.000Z",
   "actualizado": "2026-10-12T18:35:40.000Z",
   "ejemplo": true,
   "categorias": [
    "110 Escuela"
   ],
   "fechaNacimiento": "2015-06-24",
   "provincia": "Santa Fe",
   "localidad": "Armstrong",
   "grupoSanguineo": "A-",
   "obraSocial": "OSDE – Afiliado N.º 29706084",
   "emergenciaNombre": "María Cinalli",
   "emergenciaTelefono": "+54 9 3471 85-7565",
   "licenciaDeportiva": null,
   "licenciaMedica": null,
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-12T18:35:40.000Z"
   }
  },
  {
   "id": "i-016",
   "torneoId": "t-2026-f4",
   "categoria": "110 Escuela",
   "nombre": "Francisco",
   "apellido": "Medina",
   "dni": "52827466",
   "direccion": "Sarmiento 2645",
   "telefono": "+54 9 3471 66-6425",
   "email": "francisco.medina@ejemplo.com",
   "nroKarting": "22",
   "creado": "2026-10-12T16:48:21.000Z",
   "actualizado": "2026-10-12T16:48:21.000Z",
   "ejemplo": true,
   "categorias": [
    "110 Escuela"
   ],
   "fechaNacimiento": "2015-01-12",
   "provincia": "Santa Fe",
   "localidad": "Las Rosas",
   "grupoSanguineo": "0+",
   "obraSocial": "Swiss Medical – Afiliado N.º 63871553",
   "emergenciaNombre": "Jorge Medina",
   "emergenciaTelefono": "+54 9 3471 58-6864",
   "licenciaDeportiva": {
    "assetId": "ejemplo-licencia-deportiva",
    "nombre": "licencia_deportiva.jpg",
    "tipo": "image/jpeg",
    "tamano": 412330
   },
   "licenciaMedica": null,
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-12T16:48:21.000Z"
   }
  },
  {
   "id": "i-017",
   "torneoId": "t-2026-f4",
   "categoria": "110 Escuela",
   "nombre": "Romeo",
   "apellido": "Deguardia",
   "dni": "52965377",
   "direccion": "Av. Calchaquí 1345",
   "telefono": "+54 9 3471 48-3931",
   "email": "romeo.deguardia@ejemplo.com",
   "nroKarting": "32",
   "creado": "2026-10-13T11:00:01.000Z",
   "actualizado": "2026-10-13T11:00:01.000Z",
   "ejemplo": true,
   "categorias": [
    "110 Escuela"
   ],
   "fechaNacimiento": "2016-11-04",
   "provincia": "Santa Fe",
   "localidad": "Santa Fe",
   "grupoSanguineo": "0+",
   "obraSocial": "Galeno – Afiliado N.º 49361931",
   "emergenciaNombre": "María Deguardia",
   "emergenciaTelefono": "+54 9 3471 41-8989",
   "licenciaDeportiva": {
    "assetId": "ejemplo-licencia-deportiva",
    "nombre": "licencia_deportiva.jpg",
    "tipo": "image/jpeg",
    "tamano": 412330
   },
   "licenciaMedica": {
    "assetId": "ejemplo-licencia-medica",
    "nombre": "licencia_medica.pdf",
    "tipo": "application/pdf",
    "tamano": 228114
   },
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-13T11:00:01.000Z"
   }
  },
  {
   "id": "i-018",
   "torneoId": "t-2026-f4",
   "categoria": "150 Varillero Juvenil",
   "nombre": "Camila",
   "apellido": "Rojas",
   "dni": "49889715",
   "direccion": "Sarmiento 4203",
   "telefono": "+54 9 3471 52-7535",
   "email": "camila.rojas@ejemplo.com",
   "nroKarting": "23",
   "creado": "2026-10-13T10:32:54.000Z",
   "actualizado": "2026-10-13T10:32:54.000Z",
   "ejemplo": true,
   "categorias": [
    "150 Varillero Juvenil",
    "150 Multi.Senior"
   ],
   "fechaNacimiento": "2008-12-09",
   "provincia": "Santa Fe",
   "localidad": "Cañada de Gómez",
   "grupoSanguineo": "0+",
   "obraSocial": "OSECAC – Afiliado N.º 98222552",
   "emergenciaNombre": "Marcelo Rojas",
   "emergenciaTelefono": "+54 9 3471 75-8191",
   "licenciaDeportiva": {
    "assetId": "ejemplo-licencia-deportiva",
    "nombre": "licencia_deportiva.jpg",
    "tipo": "image/jpeg",
    "tamano": 412330
   },
   "licenciaMedica": {
    "assetId": "ejemplo-licencia-medica",
    "nombre": "licencia_medica.pdf",
    "tipo": "application/pdf",
    "tamano": 228114
   },
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-13T10:32:54.000Z"
   }
  },
  {
   "id": "i-019",
   "torneoId": "t-2026-f4",
   "categoria": "150 Cadenero",
   "nombre": "Facundo",
   "apellido": "Ruiz",
   "dni": "41898799",
   "direccion": "Italia 2615",
   "telefono": "+54 9 3471 45-2206",
   "email": "facundo.ruiz@ejemplo.com",
   "nroKarting": "52",
   "creado": "2026-10-14T21:10:16.000Z",
   "actualizado": "2026-10-14T21:10:16.000Z",
   "ejemplo": true,
   "categorias": [
    "150 Cadenero"
   ],
   "fechaNacimiento": "2002-10-22",
   "provincia": "Santa Fe",
   "localidad": "Venado Tuerto",
   "grupoSanguineo": "0-",
   "obraSocial": "OSDE – Afiliado N.º 20173556",
   "emergenciaNombre": "Roberto Ruiz",
   "emergenciaTelefono": "+54 9 3471 53-2257",
   "licenciaDeportiva": {
    "assetId": "ejemplo-licencia-deportiva",
    "nombre": "licencia_deportiva.jpg",
    "tipo": "image/jpeg",
    "tamano": 412330
   },
   "licenciaMedica": {
    "assetId": "ejemplo-licencia-medica",
    "nombre": "licencia_medica.pdf",
    "tipo": "application/pdf",
    "tamano": 228114
   },
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-14T21:10:16.000Z"
   }
  },
  {
   "id": "i-020",
   "torneoId": "t-2026-f4",
   "categoria": "125 Internacional",
   "nombre": "Ezequiel",
   "apellido": "Moreno",
   "dni": "39613689",
   "direccion": "Belgrano 4222",
   "telefono": "+54 9 3471 91-6163",
   "email": "ezequiel.moreno@ejemplo.com",
   "nroKarting": "96",
   "creado": "2026-10-14T14:36:33.000Z",
   "actualizado": "2026-10-14T14:36:33.000Z",
   "ejemplo": true,
   "invitado": false,
   "categorias": [
    "125 Internacional"
   ],
   "fechaNacimiento": "1991-07-24",
   "provincia": "Santa Fe",
   "localidad": "Carcarañá",
   "grupoSanguineo": "A+",
   "obraSocial": "Galeno – Afiliado N.º 56146311",
   "emergenciaNombre": "Daniel Moreno",
   "emergenciaTelefono": "+54 9 3471 86-5148",
   "licenciaDeportiva": null,
   "licenciaMedica": null,
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-14T14:36:33.000Z"
   }
  },
  {
   "id": "i-021",
   "torneoId": "t-2026-f4",
   "categoria": "125 Internacional",
   "nombre": "Pablo",
   "apellido": "Correa",
   "dni": "43180877",
   "direccion": "Italia 1438",
   "telefono": "+54 9 3471 95-0365",
   "email": "pablo.correa@ejemplo.com",
   "nroKarting": "96",
   "creado": "2026-10-15T12:49:48.000Z",
   "actualizado": "2026-10-15T12:49:48.000Z",
   "ejemplo": true,
   "invitado": true,
   "categorias": [
    "125 Internacional"
   ],
   "fechaNacimiento": "1992-09-25",
   "provincia": "Santa Fe",
   "localidad": "Casilda",
   "grupoSanguineo": "A+",
   "obraSocial": "",
   "emergenciaNombre": "Gabriel Correa",
   "emergenciaTelefono": "+54 9 3471 96-0985",
   "licenciaDeportiva": null,
   "licenciaMedica": null,
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-15T12:49:48.000Z"
   },
   "invitadoDe": "i-020"
  },
  {
   "id": "i-022",
   "torneoId": "t-2026-f4",
   "categoria": "110 Escuela",
   "nombre": "Constantino",
   "apellido": "Serra",
   "dni": "53103288",
   "direccion": "Pueyrredón 4206",
   "telefono": "+54 9 3471 76-2664",
   "email": "constantino.serra@ejemplo.com",
   "nroKarting": "31",
   "creado": "2026-10-15T21:41:47.000Z",
   "actualizado": "2026-10-15T21:41:47.000Z",
   "ejemplo": true,
   "categorias": [
    "110 Escuela"
   ],
   "fechaNacimiento": "2015-01-20",
   "provincia": "Santa Fe",
   "localidad": "Cañada de Gómez",
   "grupoSanguineo": "0+",
   "obraSocial": "",
   "emergenciaNombre": "Jorge Serra",
   "emergenciaTelefono": "+54 9 3471 90-9597",
   "licenciaDeportiva": null,
   "licenciaMedica": null,
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-15T21:41:47.000Z"
   }
  },
  {
   "id": "i-023",
   "torneoId": "t-2026-f5",
   "categoria": "110 Escuela",
   "nombre": "Benjamín",
   "apellido": "Ferreyra",
   "dni": "51001346",
   "direccion": "Av. Mitre 2104",
   "telefono": "+54 9 3471 43-0531",
   "email": "benjamin.ferreyra@ejemplo.com",
   "nroKarting": "18",
   "creado": "2026-10-12T16:08:03.000Z",
   "actualizado": "2026-10-12T16:08:03.000Z",
   "ejemplo": true,
   "categorias": [
    "110 Escuela"
   ],
   "fechaNacimiento": "2017-06-03",
   "provincia": "Santa Fe",
   "localidad": "Venado Tuerto",
   "grupoSanguineo": "A+",
   "obraSocial": "IAPOS – Afiliado N.º 80449281",
   "emergenciaNombre": "Marcelo Ferreyra",
   "emergenciaTelefono": "+54 9 3471 95-5242",
   "licenciaDeportiva": {
    "assetId": "ejemplo-licencia-deportiva",
    "nombre": "licencia_deportiva.jpg",
    "tipo": "image/jpeg",
    "tamano": 412330
   },
   "licenciaMedica": {
    "assetId": "ejemplo-licencia-medica",
    "nombre": "licencia_medica.pdf",
    "tipo": "application/pdf",
    "tamano": 228114
   },
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-12T16:08:03.000Z"
   }
  },
  {
   "id": "i-024",
   "torneoId": "t-2026-f5",
   "categoria": "125 Internacional",
   "nombre": "Martín",
   "apellido": "Fernández",
   "dni": "24683485",
   "direccion": "Lavalle 4785",
   "telefono": "+54 9 3471 74-4364",
   "email": "martin.fernandez@ejemplo.com",
   "nroKarting": "98",
   "creado": "2026-10-14T10:38:39.000Z",
   "actualizado": "2026-10-14T10:38:39.000Z",
   "ejemplo": true,
   "categorias": [
    "125 Internacional"
   ],
   "fechaNacimiento": "1986-07-15",
   "provincia": "Santa Fe",
   "localidad": "Cañada de Gómez",
   "grupoSanguineo": "A+",
   "obraSocial": "Swiss Medical – Afiliado N.º 10898636",
   "emergenciaNombre": "Jorge Fernández",
   "emergenciaTelefono": "+54 9 3471 59-0100",
   "licenciaDeportiva": {
    "assetId": "ejemplo-licencia-deportiva",
    "nombre": "licencia_deportiva.jpg",
    "tipo": "image/jpeg",
    "tamano": 412330
   },
   "licenciaMedica": {
    "assetId": "ejemplo-licencia-medica",
    "nombre": "licencia_medica.pdf",
    "tipo": "application/pdf",
    "tamano": 228114
   },
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-14T10:38:39.000Z"
   }
  },
  {
   "id": "i-025",
   "torneoId": "t-2026-f5",
   "categoria": "150 Varillero",
   "nombre": "Camila",
   "apellido": "Rojas",
   "dni": "49889715",
   "direccion": "Sarmiento 4203",
   "telefono": "+54 9 3471 94-5083",
   "email": "camila.rojas@ejemplo.com",
   "nroKarting": "23",
   "creado": "2026-10-16T10:45:40.000Z",
   "actualizado": "2026-10-16T10:45:40.000Z",
   "ejemplo": true,
   "categorias": [
    "150 Varillero"
   ],
   "fechaNacimiento": "1994-12-15",
   "provincia": "Santa Fe",
   "localidad": "Carcarañá",
   "grupoSanguineo": "A-",
   "obraSocial": "",
   "emergenciaNombre": "Daniel Rojas",
   "emergenciaTelefono": "+54 9 3471 84-5332",
   "licenciaDeportiva": {
    "assetId": "ejemplo-licencia-deportiva",
    "nombre": "licencia_deportiva.jpg",
    "tipo": "image/jpeg",
    "tamano": 412330
   },
   "licenciaMedica": {
    "assetId": "ejemplo-licencia-medica",
    "nombre": "licencia_medica.pdf",
    "tipo": "application/pdf",
    "tamano": 228114
   },
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-16T10:45:40.000Z"
   }
  },
  {
   "id": "i-foto-1",
   "torneoId": "t-2026-f4",
   "categoria": "110 Escuela",
   "nombre": "Ámbar",
   "apellido": "Russo",
   "dni": "53241199",
   "direccion": "Tucumán 4227",
   "telefono": "+54 9 3471 63-0438",
   "email": "ambar.russo@ejemplo.com",
   "nroKarting": "29",
   "creado": "2026-10-05T12:59:33.000Z",
   "actualizado": "2026-10-05T12:59:33.000Z",
   "ejemplo": true,
   "categorias": [
    "110 Escuela"
   ],
   "fechaNacimiento": "2016-03-28",
   "provincia": "Santa Fe",
   "localidad": "Cañada de Gómez",
   "grupoSanguineo": "0+",
   "obraSocial": "Galeno – Afiliado N.º 93161213",
   "emergenciaNombre": "María Russo",
   "emergenciaTelefono": "+54 9 3471 84-4733",
   "licenciaDeportiva": {
    "assetId": "ejemplo-licencia-deportiva",
    "nombre": "licencia_deportiva.jpg",
    "tipo": "image/jpeg",
    "tamano": 412330
   },
   "licenciaMedica": {
    "assetId": "ejemplo-licencia-medica",
    "nombre": "licencia_medica.pdf",
    "tipo": "application/pdf",
    "tamano": 228114
   },
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-05T12:59:33.000Z"
   }
  },
  {
   "id": "i-foto-2",
   "torneoId": "t-2026-f4",
   "categoria": "110 Escuela",
   "nombre": "Esteban",
   "apellido": "Acuña",
   "dni": "53379110",
   "direccion": "Tucumán 4227",
   "telefono": "+54 9 3471 63-0438",
   "email": "esteban.acuna@ejemplo.com",
   "nroKarting": "61",
   "creado": "2026-10-05T12:59:33.000Z",
   "actualizado": "2026-10-05T12:59:33.000Z",
   "ejemplo": true,
   "categorias": [
    "110 Escuela"
   ],
   "fechaNacimiento": "2016-03-28",
   "provincia": "Santa Fe",
   "localidad": "Cañada de Gómez",
   "grupoSanguineo": "0+",
   "obraSocial": "Galeno – Afiliado N.º 93161213",
   "emergenciaNombre": "Jorge Acuña",
   "emergenciaTelefono": "+54 9 3471 84-4733",
   "licenciaDeportiva": {
    "assetId": "ejemplo-licencia-deportiva",
    "nombre": "licencia_deportiva.jpg",
    "tipo": "image/jpeg",
    "tamano": 412330
   },
   "licenciaMedica": {
    "assetId": "ejemplo-licencia-medica",
    "nombre": "licencia_medica.pdf",
    "tipo": "application/pdf",
    "tamano": 228114
   },
   "declaracion": {
    "aceptada": true,
    "fecha": "2026-10-05T12:59:33.000Z"
   }
  }
 ],
 "puntos": {
  "t-2026-f4": {
   "f1__110-escuela": {
    "fecha": 1,
    "categoria": "110 Escuela",
    "filas": [
     {
      "posicion": 1,
      "kart": "134",
      "nombre": "Patricelli Mateo",
      "puntos": 77,
      "inscId": "i-002"
     },
     {
      "posicion": 2,
      "kart": "45",
      "nombre": "Cortel Felipe",
      "puntos": 69,
      "inscId": "i-003"
     },
     {
      "posicion": 3,
      "kart": "52",
      "nombre": "Bresan Tomás",
      "puntos": 62,
      "inscId": "i-005"
     },
     {
      "posicion": 4,
      "kart": "111",
      "nombre": "López Cristóbal",
      "puntos": 54,
      "inscId": "i-007"
     },
     {
      "posicion": 5,
      "kart": "16",
      "nombre": "Carruba Lorenzo",
      "puntos": 50,
      "inscId": "i-011"
     },
     {
      "posicion": 6,
      "kart": "40",
      "nombre": "Cinalli Facundo",
      "puntos": 37,
      "inscId": "i-015"
     },
     {
      "posicion": 7,
      "kart": "22",
      "nombre": "Medina Francisco",
      "puntos": 32,
      "inscId": "i-016"
     },
     {
      "posicion": 8,
      "kart": "32",
      "nombre": "Deguardia Romeo",
      "puntos": 32,
      "inscId": "i-017"
     },
     {
      "posicion": 9,
      "kart": "31",
      "nombre": "Serra Constantino",
      "puntos": 31,
      "inscId": "i-022"
     },
     {
      "posicion": 10,
      "kart": "29",
      "nombre": "Russo Ámbar",
      "puntos": 31,
      "inscId": "i-foto-1"
     },
     {
      "posicion": 11,
      "kart": "61",
      "nombre": "Acuña Esteban",
      "puntos": 26,
      "inscId": "i-foto-2"
     }
    ],
    "actualizado": "2026-10-24T20:00:00.000Z",
    "foto": {
     "assetId": "ejemplo-foto-resultados",
     "nombre": "Resultados.jpeg",
     "tipo": "image/jpeg"
    }
   }
  }
 }
};
