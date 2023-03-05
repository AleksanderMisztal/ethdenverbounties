import { useState } from 'react';
import Link from 'next/link';

export async function getStaticPaths() {
  const data = require('../../public/bounties.json').challenges;
  return {
    paths: data.map((bounty) => {
      return {
        params: { id: bounty.challengeId },
      };
    }),
    fallback: false,
  };
}

export function getStaticProps(context) {
  const id = context.params.id;
  const bounty = require('../../public/bounties.json').challenges.find(
    (bounty) => bounty.challengeId === id
  );

  return {
    props: { bounty },
  };
}

const Bounty = ({ bounty }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="bg-green-900 rounded-lg p-2 mt-3 mb-6 w-fit">
        <Link href="/">Back</Link>
      </div>

      <h1 className="text-xl font-bold">{bounty.name}</h1>

      <h4 className="text-xl mt-6">Description</h4>
      <p
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: bounty.description }}
      />

      <h4 className="text-xl mt-6">Acceptance criteria</h4>
      <div
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: bounty.acceptanceCriteria }}
      />

      <h4 className="text-xl mt-6">Rewards</h4>
      {bounty.rewardPool ? (
        <p>{bounty.rewardPool} reward pool</p>
      ) : (
        <ul>
          {bounty.rewards.map((reward, i) => (
            <li key={i}>
              {i + 1}: {reward.rewardAmountUsd} USD {reward.rewardText}
            </li>
          ))}
        </ul>
      )}

      <h4 className="text-xl mt-6">Resources</h4>
      {bounty.resources && (
        <dl className="grid gap-4">
          {bounty.resources.map(({ description, resourceUrl }, i) => (
            <div key={i}>
              <dt className="font-bold text-l">{description}</dt>
              <dd>
                <a href={resourceUrl.replace(/\)$/, '')} target="_blank">
                  {resourceUrl.match(
                    /https:\/\/www.youtube.com\/watch\?v=([^/&)]*)/
                  ) ? (
                    <iframe
                      width="800"
                      height="450"
                      src={`https://www.youtube-nocookie.com/embed/${
                        resourceUrl.match(
                          /https:\/\/www.youtube.com\/watch\?v=([^/)&]*)/
                        )[1]
                      }`}
                      frameborder="0"
                      allow="autoplay; encrypted-media"
                      allowfullscreen
                    />
                  ) : (
                    resourceUrl
                  )}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      )}

      <button
        className="bg-green-900 rounded-lg p-2 mt-3"
        onClick={() => setShow(!show)}
      >
        {show ? 'Hide' : 'Show all info'}
      </button>

      {show && <p>{JSON.stringify(bounty)}</p>}
    </>
  );
};

export default Bounty;
