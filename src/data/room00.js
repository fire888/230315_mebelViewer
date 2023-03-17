const L = -5000
const R = 5000
const N = -5000
const S = 5000

const W_DOOR = 800
const W_WINDOW_S = 5000
const W_WINDOW_R = 8000


export const flatJSON = {
    "rooms":
        [
            [
                {
                    "id": "2",
                    "class": "bedroom",
                    "path":
                        [
                            [L, N],
                            [L, S],
                            [R, S],
                            [R, N],
                            [L, N]
                        ],
                    "parameters":
                        [
                            {
                                "height": 2900,
                                "wall-texture": "GUID-iurn9rewqer0g",
                                "floor-texture": "GUID-iufsdhfdhfqer0g",
                                "ceiling-texture": "GUID-iurn9rgsdfhxvcng"
                            }
                        ]
                }
            ]
        ],
    "outer-perimeter":
        [
            [
            ]
        ],
    "inner-perimeters":[
        [
            // LEFT WALL

            {
                "id": "211",
                "class": "inner-wall",
                "type": "solid",
                "ref-room": "2",
                "path":
                    [
                        [L, N + ((S - N) / 2)],
                        [L, N]
                    ]
            },
            {
                "id": "212",
                "class": "inner-wall",
                "type": "cut",
                "ref-room": "2",
                "path":
                    [
                        [L, N + ((S - N) / 2)  +  W_DOOR],
                        [L, N + ((S - N) / 2)]
                        // [4000,4400],
                        // [4000,3600]
                    ]
            },
            {
                "id": "213",
                "class": "inner-wall",
                "type": "solid",
                "ref-room": "2",
                "path":
                    [
                        [L, S],
                        [L, N + ((S - N) / 2) +  W_DOOR]
                    ]
            },



            // BOTTOM

            {
                "id": "221",
                "class": "inner-wall",
                "type": "solid",
                "ref-room": "2",
                "path":
                    [
                        [L + (R - L) / 2 - W_WINDOW_S / 2, S],
                        [L, S],

                        //[5200,7800],
                        //[4000,7800],
                    ]
            },
            {
                "id": "222",
                "class": "inner-wall",
                "type": "cut",
                "ref-room": "2",
                "path":
                    [
                        [L + (R - L) / 2 + W_WINDOW_S  / 2, S],
                        [L + (R - L) / 2 - W_WINDOW_S / 2, S],
                    ]
            },
            {
                "id": "223",
                "class": "inner-wall",
                "type": "solid",
                "ref-room": "2",
                "path":
                    [
                        [R,S],
                        [L + (R - L) / 2 + W_WINDOW_S / 2, S],
                    ]
            },

            /** RIGHT WALL *****/

            {
                "id": "231",
                "class": "inner-wall",
                "type": "solid",
                "ref-room": "2",
                "path":
                    [
                        [R, N + (S - N) / 2 + W_WINDOW_R / 2],
                        [R, S],

                    ]
            },
            {
                "id": "232",
                "class": "inner-wall",
                "type": "cut",
                "ref-room": "2",
                "path":
                    [
                        [R, N + (S - N) / 2 - W_WINDOW_R / 2],
                        [R, N + (S - N) / 2 + W_WINDOW_R / 2],
                    ]
            },
            {
                "id": "233",
                "class": "inner-wall",
                "type": "solid",
                "ref-room": "2",
                "path":
                    [
                        [R, N],
                        [R, N + (S - N) / 2 - W_WINDOW_R / 2],
                    ]
            },


            /** TOP WALL *****/
            {
                "id": "241",
                "class": "inner-wall",
                "type": "solid",
                "ref-room": "2",
                "path":
                    [
                        //[6400,N],
                        [L + (R - L) / 2 + W_DOOR, N],
                        [R, N],

                    ]
            },
            {
                "id": "242",
                "class": "inner-wall",
                "type": "cut",
                "ref-room": "2",
                "path":
                    [
                        [L + (R - L) / 2, N],
                        [L + (R - L) / 2 + W_DOOR, N],

                    ]
            },
            {
                "id": "243",
                "class": "inner-wall",
                "type": "solid",
                "ref-room": "2",
                "path":
                    [
                        [L, N],
                        [L + (R - L) / 2, N],
                    ]
            }
        ]
    ],
    "objects": [
        [
            {
                "id": "346",
                "class": "window",
                "parameters":
                    [
                        {
                            "height-bottom": 960,
                            "height-top": 2660
                        }
                    ],
                "location":
                    [
                        {
                            "ref-wall": "222",
                            "path":
                                [
                                    [L + (R - L) / 2 - W_WINDOW_S / 2, S],
                                    [L + (R - L) / 2 + W_WINDOW_S / 2, S]
                                ]
                        },
                        {
                            "ref-wall": "424",
                            "path":
                                [
                                    [L + (R - L) / 2 - W_WINDOW_S / 2, S + 200],
                                    [L + (R - L) / 2 + W_WINDOW_S / 2, S + 200]
                                ]
                        }
                    ]
            },
            {
                "id": "347",
                "class": "window",
                "parameters":
                    [
                        {
                            "height-bottom": 960,
                            "height-top": 2660
                        }
                    ],
                "location":
                    [
                        {
                            "ref-wall": "232",
                            "path":
                                [
                                    [R, N + (S - N) / 2 - W_WINDOW_R / 2],
                                    [R, N + (S - N) / 2 + W_WINDOW_R / 2]
                                ]
                        },
                        {
                            "ref-wall": "432",
                            "path":
                                [
                                    [R + 200, N + (S - N) / 2 - W_WINDOW_R / 2],
                                    [R + 200, N + (S - N) / 2 + W_WINDOW_R / 2]
                                ]
                        }
                    ]
            },
            {
                "id": "349",
                "class": "door",
                "parameters":
                    [
                        {
                            "type": "interior-door",
                            "height-bottom": 0,
                            "height-top": 2000
                        }
                    ],
                "location":
                    [
                        {
                            "ref-wall": "132",
                            "path":
                                [
                                    [L - 200, N + ((S - N) / 2)],
                                    [L - 200, N + ((S - N) / 2) +  W_DOOR],
                                ]
                        },
                        {
                            "ref-wall": "212",
                            "path":
                                [
                                    [L, N + ((S - N) / 2) +  W_DOOR],
                                    [L, N + ((S - N) / 2)],
                                ]
                        }
                    ]
            }
        ]
    ]
}
