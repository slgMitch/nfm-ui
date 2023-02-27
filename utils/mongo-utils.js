import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  const client = await MongoClient.connect(process.env.MONGO_URL);

  return client;
} 

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function insertDocuments(client, collection, documents) {
  const db = client.db();

  const result = await db.collection(collection).insertMany(documents);

  return result;
}

export async function getAllDocuments(client, collection) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find()
    .toArray();

  return documents;
}

export async function findDocumentsByQueryObject(client, collection, queryObject) {
  const db = client.db();

  const documents = await db
  .collection(collection)
  .find(queryObject)
  .toArray();

return documents;
}

export async function getOneDocument(client, collection, documentObject) {
  const db = client.db();

  const document = await db.collection(collection).findOne(documentObject);

  return document;
}

export async function deleteCollection(client, collection) {
  const db = client.db();

  const result = await db.collection(collection).drop();

  return result;
}

export async function updateDocument(client, collection, filter, document) {
  const db = client.db();

  const result = await db.collection(collection).updateOne(filter, document);

  return result
}

export function generateMongoProductData(requestData, variantPreviewImages) {
  const { variants } = requestData.product
  const { sync_variants } = variantPreviewImages

  const product = createProductData(variants, sync_variants, variantPreviewImages, requestData)
  const productVariants = craeteProductVariants(variants, sync_variants, requestData)

  const mongoProductData = {
    product,
    productVariants
  }

  return mongoProductData
}

// need to add availability options
function craeteProductVariants(variants, sync_variants, requestData) {
  const productVariants = sync_variants.map((sync) => {
    const variant = variants.find(v => v.id === sync.variant_id)
    const productVariant = {
      externalId: sync.external_id,
      syncVariantId: sync.id,
      baseVariantId: sync.variant_id,
      baseProductId: requestData.product.id,
      syncProductId: sync.sync_product_id,
      name: sync.name,
      imagePreviewUrl: sync.files[1].preview_url,
      imageThumbnailUrl: sync.files[1].thumbnail_url,
      color: { color: variant.color, color_code: variant.color_code }, // find reqData variant by baseVariantId and use color
      size: variant.size, // find reqData variant by baseVariantId and use size
      productCategory: requestData.product.category,
      tokenData: {
        tokenAddress: requestData.nftData.token_address,
        tokenName: requestData.nftData.name,
        tokenSymbol: requestData.nftData.symbol
      },
      retailPrice: sync.retail_price,
      productCreator: requestData.userWalletAddress,
      availabilityStatus: variant.availability_status
    }
    return productVariant
  })
  return productVariants
}

function createProductData(variants, sync_variants, variantPreviewImages, requestData) {
  const allProductColors = variants.map(variant => {
    return { color: variant.color, colorCode: variant.color_code }
  })
  const uniqueProductColors = allProductColors.filter((value, index, self) => 
    index === self.findIndex((color) => (color.color === value.color && color.color_code === value.color_code))
  )
  const productSizes = [...new Set(variants.map(variant => variant.size))]
  const productMaxPrice = Math.max(...variants.map(variant => +variant.price)).toFixed(2)
  const productMinPrice = Math.min(...variants.map(variant => +variant.price)).toFixed(2)

  const product = {
    externalId: variantPreviewImages.sync_product.external_id,
    baseProductId: requestData.product.id,
    syncProductId: variantPreviewImages.sync_product.id,
    name: variantPreviewImages.sync_product.name,
    imagePreviewUrl: sync_variants[sync_variants.length - 1].files[1].preview_url,
    imageThumbnailUrl: sync_variants[sync_variants.length - 1].files[1].thumbnail_url,
    colors: uniqueProductColors,
    sizes: productSizes,
    productCategory: requestData.product.category,
    tokenData: {
      tokenAddress: requestData.nftData.token_address,
      tokenName: requestData.nftData.name,
      tokenSymbol: requestData.nftData.symbol
    },
    maxPrice: productMaxPrice,
    minPrice: productMinPrice,
    productCreator: requestData.userWalletAddress
  }

  return product
}