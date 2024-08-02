import { Flex } from "src/styles/styled";
import * as S from "src/styles/pages/Product";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getComments } from "src/api/product";
import { CommentType } from "src/types/type";
import kebabImg from "src/assets/ic_kebab@2x.png";
import dayjs from "dayjs";

function ProductCommentsComponent() {
  const { productId } = useParams();
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const handleLoad = async (id: number) => {
      const nextComments = await getComments(id, { limit: 10 });

      setComments([...nextComments.list]);
    };
    handleLoad(Number(productId));
  }, [productId]);

  return (
    <>
      <Flex flex="column" gap={16}>
        <S.Text>문의하기</S.Text>
        <S.CommentArea placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다." />
        <S.CommentSubmit>등록</S.CommentSubmit>
      </Flex>
      <ul>
        {comments?.map((comment) => (
          <li>
            <Flex mt={40} flex="column">
              <Flex content="space-between">
                <S.CommentContent>{comment?.content}</S.CommentContent>
                <img width={24} height={24} src={kebabImg} alt="kebab" />
              </Flex>
              <Flex height={50} mt={24} item="center" gap={12}>
                <S.Profile src={comment.writer.image} />
                <Flex flex="column" grow={1}>
                  <S.ProfileName>{comment.writer.nickname}</S.ProfileName>
                  <S.CreateDate>
                    {dayjs(comment?.createdAt).format("YYYY. MM. DD")}
                  </S.CreateDate>
                </Flex>
              </Flex>
            </Flex>
            <S.VerticalBar mt={12} mb={16} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProductCommentsComponent;
