import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '#core/clients/index.js';
import { envConstants } from '#core/constants/index.js';
const mapAvatar = async (avatar) => {
    const command = new GetObjectCommand({
        Bucket: envConstants.AWS_S3_BUCKET,
        Key: avatar,
    });
    const expiresIn = 60 * 60 * 24; // 1 day expiration time.
    return await getSignedUrl(s3Client, command, { expiresIn });
};
export const mapUserFromModelToApi = async (user) => {
    const avatar = await mapAvatar(user?.avatar);
    return {
        email: user?.email,
        role: user?.role,
        avatar,
    };
};
