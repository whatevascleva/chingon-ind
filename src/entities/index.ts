/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: subscriptionplans
 * @catalog This collection is an eCommerce catalog
 * Interface for SubscriptionPlans
 */
export interface SubscriptionPlans {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  itemName?: string;
  /** @wixFieldType number */
  itemPrice?: number;
  /** @wixFieldType text */
  itemDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  itemImage?: string;
  /** @wixFieldType text */
  keyFeatures?: string;
  /** @wixFieldType url */
  subscribeUrl?: string;
}


/**
 * Collection ID: termsandpolicies
 * Interface for TermsandPolicies
 */
export interface TermsandPolicies {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  policyTitle?: string;
  /** @wixFieldType text */
  policyType?: string;
  /** @wixFieldType text */
  policyContent?: string;
  /** @wixFieldType date */
  effectiveDate?: Date | string;
  /** @wixFieldType date */
  lastUpdated?: Date | string;
  /** @wixFieldType text */
  versionNumber?: string;
}
