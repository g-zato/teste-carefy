/// <reference types="vite/client" />

interface City {
    "Version": number;
    "Key": string;
    "Type": string;
    "Rank": number;
    "LocalizedName": string;
    "EnglishName": string | undefined;
    "PrimaryPostalCode": string | undefined;
    "Region": {
        "ID": string | undefined,
        "LocalizedName": string | undefined,
        "EnglishName": string | undefined
    },
    "Country": {
        "ID": string,
        "LocalizedName": string,
        "EnglishName": string | undefined
    },
    "AdministrativeArea": {
        "ID": string,
        "LocalizedName": string,
        "EnglishName": string | undefined,
        "Level": number | undefined,
        "LocalizedType": string | undefined,
        "EnglishType": string | undefined,
        "CountryID": string | undefined
    },
    "TimeZone": {
        "Code": string | undefined,
        "Name": string | undefined,
        "GmtOffset": number | undefined,
        "IsDaylightSaving": boolean | undefined,
        "NextOffsetChange": null | undefined
    },
    "GeoPosition": {
        "Latitude": number | undefined,
        "Longitude": number | undefined,
        "Elevation": {
            "Metric": {
                "Value": number | undefined,
                "Unit": string | undefined,
                "UnitType": number | undefined
            },
            "Imperial": {
                "Value": number | undefined,
                "Unit": string | undefined,
                "UnitType": number | undefined
            }
        }
    },
    "IsAlias": boolean,
    "SupplementalAdminAreas": [],
    "DataSets": string[]
}

interface WeatherData { 
        "LocalObservationDateTime": string | undefined;
        "EpochTime": number | undefined;
        "WeatherText": string | undefined;
        "WeatherIcon": number | undefined;
        "HasPrecipitation": boolean | undefined;
        "PrecipitationType": string | null | undefined;
        "IsDayTime": boolean | undefined;
        "Temperature": {
            "Metric": {
                "Value": number;
                "Unit": string | undefined;
                "UnitType": number | undefined
            },
            "Imperial": {
                "Value": number | undefined;
                "Unit": string | undefined;
                "UnitType": number | undefined
            }
        };
        "MobileLink": string | undefined;
        "Link": string | undefined
}

interface SelectedCity {
    "Key": string;
    "LocalizedName": string;
}
