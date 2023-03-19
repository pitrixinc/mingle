export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'userName',
      title: 'UserName',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'string',
    },
    {
      name: 'isVerified',
      title: 'Is Verified',
      type: 'boolean',
    },
    {
      name: 'followers',
      title: 'Followers',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'user' }] }],
    },
    {
      name: 'following',
      title: 'Following',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'user' }] }],
    },
  ],
};
