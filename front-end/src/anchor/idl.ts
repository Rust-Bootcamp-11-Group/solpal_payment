export type Subscription = {
    "version": "0.2.0",
    "name": "subscription",
    "instructions": [
        {
            "name": "initialize",
            "accounts": [
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "subscription",
                    "isMut": true,
                    "isSigner": false,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "type": "string",
                                "value": "subscription"
                            }
                        ]
                    }
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "purchase",
            "accounts": [
                {
                    "name": "subscription",
                    "isMut": true,
                    "isSigner": false,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "type": "string",
                                "value": "subscription"
                            }
                        ]
                    }
                }
            ],
            "args": []
        }
    ],
    "accounts": [
        {
            "name": "subscription",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "price",
                        "type": "u64"
                    },
                    {
                        "name": "bump",
                        "type": "u8"
                    }
                ]
            }
        }
    ]
};

export const IDL: Subscription = {
    "version": "0.2.0",
    "name": "subscription",
    "instructions": [
        {
            "name": "initialize",
            "accounts": [
                {
                    "name": "user",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "subscription",
                    "isMut": true,
                    "isSigner": false,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "type": "string",
                                "value": "subscription"
                            }
                        ]
                    }
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "purchase",
            "accounts": [
                {
                    "name": "subscription",
                    "isMut": true,
                    "isSigner": false,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "type": "string",
                                "value": "subscription"
                            }
                        ]
                    }
                }
            ],
            "args": []
        }
    ],
    "accounts": [
        {
            "name": "subscription",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "price",
                        "type": "u64"
                    },
                    {
                        "name": "bump",
                        "type": "u8"
                    }
                ]
            }
        }
    ]
};