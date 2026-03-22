import type MarkdownIt from 'markdown-it'

/**
 * Converts [[torch.Tensor.shape]] to <PytorchLink /> Vue components
 */
export const pytorchLinkPlugin = (md: MarkdownIt) => {
  md.core.ruler.before('inline', 'external-pytorch-links', (state) => {
    state.tokens.forEach((token) => {
      if (token.type !== 'inline') return;

      const regex = /\[\[([\w\.]+)\]\]/g;
      
      token.content = token.content.replace(regex, (_, name) => {
        return `${name} <PytorchLink name="${name}" />`;
      });
    });
  });
};
