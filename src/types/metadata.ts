     interface Category {
        value: string;
    }

     interface SiteType {
        value: string;
    }

     interface SiteTag {
        value: string;
    }

     interface SiteSafety {
        value: string;
    }

    export interface MetaData {
        category: Category;
        domainAddress: string;
        siteUrl: string;
        siteType: SiteType;
        siteTag: SiteTag;
        siteSafety: SiteSafety;
        metaDataUri: string;
        voter: string;
        description: string;
        name: string;
        image: string;
    }
