import versionManifest from './src/data/generated/version.json';

export interface ApplicationVersionInfo {
  applicationVersion: string;
  catalogVersion: string;
  generatedAt: string;
}

export const APP_VERSION = versionManifest.applicationVersion;
export const CATALOG_VERSION = versionManifest.catalogVersion;
export const GENERATED_AT = versionManifest.generatedAt;

export const VERSION_INFO: ApplicationVersionInfo = {
  applicationVersion: APP_VERSION,
  catalogVersion: CATALOG_VERSION,
  generatedAt: GENERATED_AT,
};
