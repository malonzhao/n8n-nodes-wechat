import {
	AllEntities,
	IExecuteFunctions,
	INodeProperties,
	INodePropertyOptions,
} from 'n8n-workflow';

export interface Resource {
	description: INodeProperties[];
	execute?: (ctx: IExecuteFunctions) => Promise<any>;
}

export interface Operation extends Resource {
	option: INodePropertyOptions;
}

type NodeMap = {
	comment:
		| 'openArticleComment'
		| 'closeComment'
		| 'deleteComment'
		| 'listComment'
		| 'electComment'
		| 'unelectComment'
		| 'replyComment'
		| 'deleteReplyComment';

	draft:
		| 'switchDraft'
		| 'createDraft'
		| 'getDraft'
		| 'updateDraft'
		| 'deleteDraft'
		| 'batchGetDraft'
		| 'countDraft'
		| 'getProductionDom';

	material:
		| 'createMaterial'
		| 'getMaterial'
		| 'deleteMaterial'
		| 'getHDVoice'
		| 'batchGetMaterial'
		| 'getMaterialCount'
		| 'uploadImage'
		| 'getMedia'
		| 'uploadTempMedia';

	menu:
		| 'createConditionalMenu'
		| 'deleteConditionalMenu'
		| 'createCustomMenu'
		| 'deleteCustomMenu'
		| 'getCustomMenu'
		| 'getCustomMenuInfo'
		| 'tryMatchMenu';

	publish:
		| 'getPublish'
		| 'getPublishArticle'
		| 'batchGetPublish'
		| 'draftPublish'
		| 'deletePublish';

	response:
		| 'textResponse'
		| 'imageResponse'
		| 'voiceResponse'
		| 'videoResponse'
		| 'musicResponse'
		| 'newsResponse';

	template:
		| 'createTemplate'
		| 'deleteTemplate'
		| 'getAllTemplates'
		| 'getIndustry'
		| 'queryBlockTmplMsg'
		| 'sendTemplateMessage'
		| 'setIndustry';

	user:
		| 'getFans'
		| 'getUserInfo'
		| 'batchGetUserInfo'
		| 'updateRemark'
		| 'getBlacklist'
		| 'batchBlacklist'
		| 'batchUnblacklist'
		| 'createTag'
		| 'updateTag'
		| 'deleteTag'
		| 'getTags'
		| 'batchTagging'
		| 'batchUntagging'
		| 'getTagFans'
		| 'getTagIdList';
};

export type IWechatOfficialAccount = AllEntities<NodeMap>;
