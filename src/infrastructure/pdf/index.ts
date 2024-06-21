// lambda has a built in dictionary of print urls that are used to generate the pdfs based on mode
// productId is forwarded to the print endpoint as a search parameter
// url is a signed upload url that the printed pdf will be uploaded to
// fileId can hopefully be used with the signed url
export interface PrintJobArgs {
	mode: 'cross-stitch' | 'coloring-pages';
  productId: string;
	fileId: string;
	url: string;
}
