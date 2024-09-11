/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/subscription_processor.json`.
 */
export type SubscriptionProcessor = {
  "address": "9hcxbmQq18uCcSTs9zMKAHivEYrfJ9DF3FMn5LhgD3n8",
  "metadata": {
    "name": "subscriptionProcessor",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "subscriptionAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "subscribe",
      "discriminator": [
        254,
        28,
        191,
        138,
        156,
        179,
        183,
        53
      ],
      "accounts": [
        {
          "name": "subscriptionAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "tier",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "subscriptionAccount",
      "discriminator": [
        247,
        1,
        6,
        72,
        172,
        66,
        24,
        128
      ]
    }
  ],
  "types": [
    {
      "name": "subscriber",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "tier",
            "type": "u8"
          },
          {
            "name": "paidAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "subscriptionAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "tier1Price",
            "type": "u64"
          },
          {
            "name": "tier2Price",
            "type": "u64"
          },
          {
            "name": "tier3Price",
            "type": "u64"
          },
          {
            "name": "subscribers",
            "type": {
              "vec": {
                "defined": {
                  "name": "subscriber"
                }
              }
            }
          }
        ]
      }
    }
  ]
};

export const IDL : SubscriptionProcessor = {
  "address": "9hcxbmQq18uCcSTs9zMKAHivEYrfJ9DF3FMn5LhgD3n8",
  "metadata": {
    "name": "subscriptionProcessor",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "subscriptionAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "subscribe",
      "discriminator": [
        254,
        28,
        191,
        138,
        156,
        179,
        183,
        53
      ],
      "accounts": [
        {
          "name": "subscriptionAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "tier",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "subscriptionAccount",
      "discriminator": [
        247,
        1,
        6,
        72,
        172,
        66,
        24,
        128
      ]
    }
  ],
  "types": [
    {
      "name": "subscriber",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "tier",
            "type": "u8"
          },
          {
            "name": "paidAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "subscriptionAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "tier1Price",
            "type": "u64"
          },
          {
            "name": "tier2Price",
            "type": "u64"
          },
          {
            "name": "tier3Price",
            "type": "u64"
          },
          {
            "name": "subscribers",
            "type": {
              "vec": {
                "defined": {
                  "name": "subscriber"
                }
              }
            }
          }
        ]
      }
    }
  ]
};