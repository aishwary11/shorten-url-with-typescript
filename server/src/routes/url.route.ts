import { Router } from 'express';
import { deletePost, getUrls, postUrl, reDirectUrl } from '../controllers/url.controller';
const router: Router = Router();

router.get('/', getUrls);
router.get('/:urlCode', reDirectUrl);
router.post('/shorten', postUrl);
router.delete('/:urlCode', deletePost);

export default router;
